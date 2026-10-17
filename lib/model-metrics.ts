export interface ModelMetrics {
  accuracy: number | null
  precision: number | null
  recall: number | null
  f1: number | null
  evaluatedOn: string | null
}

// Copy these values (0–1) from the evaluation cell of your Kaggle notebook,
// e.g. sklearn.metrics.classification_report on the held-out test set.
// Leave a value as null until it has been measured.
export const MODEL_METRICS: ModelMetrics = {
  accuracy: 0.9839,
  precision: 0.9456,
  recall: 0.9329,
  f1: 0.9392,
  evaluatedOn: null,
}
