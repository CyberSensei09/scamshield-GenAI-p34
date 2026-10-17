export type AnalysisMode = 'model' | 'demo'

export type Classification = 'suspicious' | 'legitimate'

export type RiskLevel = 'low' | 'medium' | 'high'

export type IndicatorCategory =
  | 'urgency'
  | 'credentials'
  | 'threat'
  | 'prize'
  | 'payment'
  | 'delivery'
  | 'link'

export interface Indicator {
  category: IndicatorCategory
  title: string
  description: string
  matches: string[]
}

export interface DetectedUrl {
  url: string
  domain: string
  flags: string[]
}

export interface AnalysisResult {
  mode: AnalysisMode
  classification: Classification
  riskLevel: RiskLevel | null
  /** Probability that the message is spam. Only present when returned by the ML backend. */
  score: number | null
  /** Raw label returned by the ML backend, if any. */
  modelLabel: string | null
  /** Free-text warnings returned by the ML backend. */
  modelWarnings: string[]
  indicators: Indicator[]
  highlights: string[]
  urls: DetectedUrl[]
  recommendations: string[]
  notice: string | null
}

export interface AnalyzeErrorBody {
  error: string
}

export const MAX_MESSAGE_LENGTH = 5000
