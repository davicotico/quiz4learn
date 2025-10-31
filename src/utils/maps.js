import { decodeHTML, shuffleArray } from './utils';

export function toOpenTrivia(q) {
  return {
    category: decodeHTML(q.category),
    correctAnswer: q.correct_answer,
    difficulty: q.difficulty,
    question: q.question,
    type: q.type,
    options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
  };
}

export function toQuiz4Learn(q) {
  return {
    category: decodeHTML(q.category),
    correctAnswer: q.correct_answer,
    difficulty: q.difficulty,
    question: q.question,
    type: q.type,
    options: shuffleArray([...q.incorrect_answers, q.correct_answer]),
    explanation: q.explanation,
  };
}
