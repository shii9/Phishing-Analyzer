import { selfAssessmentQuestions, MAX_RAW_SCORE, riskCategories, RiskCategory } from '@/data/selfAssessmentQuestions';

export interface AssessmentResult {
  rawScore: number;
  normalizedScore: number;
  category: RiskCategory;
  recommendations: string[];
  timestamp: Date;
}

export interface AssessmentAnswer {
  questionId: number;
  selectedKey: string;
  weight: number;
}

/**
 * Calculate the raw score from assessment answers
 */
export function calculateRawScore(answers: AssessmentAnswer[]): number {
  return answers.reduce((total, answer) => total + answer.weight, 0);
}

/**
 * Normalize raw score to 0-100 scale
 */
export function normalizeScore(rawScore: number): number {
  const normalized = Math.min(Math.round((rawScore / MAX_RAW_SCORE) * 100), 100);
  return normalized;
}

/**
 * Get risk category based on normalized score
 */
export function getRiskCategory(normalizedScore: number): RiskCategory {
  return riskCategories.find(category =>
    normalizedScore >= category.range[0] && normalizedScore <= category.range[1]
  ) || riskCategories[riskCategories.length - 1]; // fallback to highest risk
}

/**
 * Calculate complete assessment result
 */
export function calculateAssessmentResult(answers: AssessmentAnswer[]): AssessmentResult {
  const rawScore = calculateRawScore(answers);
  const normalizedScore = normalizeScore(rawScore);
  const category = getRiskCategory(normalizedScore);

  return {
    rawScore,
    normalizedScore,
    category,
    recommendations: category.recommendations,
    timestamp: new Date()
  };
}

/**
 * Validate that all questions have been answered
 */
export function validateAnswers(answers: AssessmentAnswer[]): boolean {
  return answers.length === selfAssessmentQuestions.length &&
         answers.every(answer => answer.questionId && answer.selectedKey && typeof answer.weight === 'number');
}

/**
 * Get question by ID
 */
export function getQuestionById(questionId: number) {
  return selfAssessmentQuestions.find(q => q.id === questionId);
}

/**
 * Get option by question ID and key
 */
export function getOptionByKey(questionId: number, key: string) {
  const question = getQuestionById(questionId);
  return question?.options.find(option => option.key === key);
}

/**
 * Convert answers array to assessment answers with weights
 */
export function processAnswers(answers: { questionId: number; selectedKey: string }[]): AssessmentAnswer[] {
  return answers.map(answer => {
    const option = getOptionByKey(answer.questionId, answer.selectedKey);
    if (!option) {
      throw new Error(`Invalid answer for question ${answer.questionId}: ${answer.selectedKey}`);
    }
    return {
      questionId: answer.questionId,
      selectedKey: answer.selectedKey,
      weight: option.weight
    };
  });
}
