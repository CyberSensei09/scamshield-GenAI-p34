import type { AnalysisResult, AnalyzeErrorBody } from './analysis/types'

export class AnalyzeError extends Error {}

export async function requestAnalysis(message: string): Promise<AnalysisResult> {
  let response: Response
  try {
    response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
  } catch {
    throw new AnalyzeError('Could not reach the server. Check your connection and try again.')
  }

  const data = (await response.json().catch(() => null)) as AnalysisResult | AnalyzeErrorBody | null

  if (!response.ok || !data || 'error' in data) {
    throw new AnalyzeError(data && 'error' in data ? data.error : 'Something went wrong. Please try again.')
  }
  return data
}
