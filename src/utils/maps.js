import { decodeHTML, shuffleArray } from './utils';

export function toQuiz4Learn(q) {
  return {
    category: decodeHTML(q.category),
    type: q.type,
    difficulty: q.difficulty,
    question: q.question,
    correctAnswer: q.correct_answer,
    options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
    explanation: q.explanation,
  };
}
