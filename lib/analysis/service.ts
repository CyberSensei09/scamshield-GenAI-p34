import 'server-only'

import { buildRecommendations, runSecurityChecks } from './heuristics'
import type { AnalysisResult, Classification, RiskLevel } from './types'

const SPAM_LABELS = new Set(['spam', 'scam', 'phishing', 'fraud', 'suspicious', 'smishing', '1', 'true'])
const BACKEND_TIMEOUT_MS = 8000

interface BackendResponse {
  label: string
  score: number | null
  warnings: string[]
  urls: string[]
}

export function isModelConfigured(): boolean {
  return Boolean(process.env.ML_API_URL)
}

function parseBackendResponse(data: unknown): BackendResponse | null {
  if (!data || typeof data !== 'object') return null
  const record = data as Record<string, unknown>

  const rawLabel = record.label ?? record.prediction ?? record.class
  if (rawLabel === undefined || rawLabel === null) return null

  const rawScore = record.score ?? record.probability ?? record.spam_probability ?? record.confidence
  const score = typeof rawScore === 'number' && Number.isFinite(rawScore) ? Math.min(Math.max(rawScore, 0), 1) : null

  const toStringArray = (value: unknown) =>
    Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string').slice(0, 20) : []

  return {
    label: String(rawLabel).toLowerCase().trim(),
    score,
    warnings: toStringArray(record.warnings),
    urls: toStringArray(record.urls),
  }
}

async function callModelBackend(message: string): Promise<BackendResponse> {
  const endpoint = process.env.ML_API_URL as string
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (process.env.ML_API_KEY) headers.Authorization = `Bearer ${process.env.ML_API_KEY}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
    cache: 'no-store',
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  })

  if (!response.ok) throw new Error(`Model backend responded with ${response.status}`)

  const parsed = parseBackendResponse(await response.json())
  if (!parsed) throw new Error('Model backend returned an unexpected response shape')
  return parsed
}

function riskFromScore(score: number): RiskLevel {
  if (score >= 0.75) return 'high'
  if (score >= 0.4) return 'medium'
  return 'low'
}

export async function analyzeMessage(message: string): Promise<AnalysisResult> {
  const checks = runSecurityChecks(message)

  if (isModelConfigured()) {
    try {
      const model = await callModelBackend(message)
      const classification: Classification = SPAM_LABELS.has(model.label) ? 'suspicious' : 'legitimate'

      const knownUrls = new Set(checks.urls.map((u) => u.url.toLowerCase()))
      const extraUrls = model.urls
        .filter((u) => !knownUrls.has(u.toLowerCase()))
        .map((url) => ({ url, domain: url, flags: [] as string[] }))

      return {
        mode: 'model',
        classification,
        riskLevel: model.score !== null ? riskFromScore(model.score) : null,
        score: model.score,
        modelLabel: model.label,
        modelWarnings: model.warnings,
        indicators: checks.indicators,
        highlights: checks.highlights,
        urls: [...checks.urls, ...extraUrls],
        recommendations: buildRecommendations(classification, checks.indicators),
        notice: null,
      }
    } catch (error) {
      console.error('[analyze] Model backend unavailable:', error instanceof Error ? error.message : error)
      return {
        mode: 'demo',
        classification: checks.classification,
        riskLevel: checks.riskLevel,
        score: null,
        modelLabel: null,
        modelWarnings: [],
        indicators: checks.indicators,
        highlights: checks.highlights,
        urls: checks.urls,
        recommendations: buildRecommendations(checks.classification, checks.indicators),
        notice:
          'The machine-learning backend could not be reached, so this result comes from rule-based demo checks only — not the trained model.',
      }
    }
  }

  return {
    mode: 'demo',
    classification: checks.classification,
    riskLevel: checks.riskLevel,
    score: null,
    modelLabel: null,
    modelWarnings: [],
    indicators: checks.indicators,
    highlights: checks.highlights,
    urls: checks.urls,
    recommendations: buildRecommendations(checks.classification, checks.indicators),
    notice:
      'Demo mode: no machine-learning backend is connected. This result comes from transparent rule-based checks, not the trained model.',
  }
}
