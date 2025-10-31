export class Quiz {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.isFinished = false;
  }

  loadQuestions(questions) {
    this.questions = questions;
    this.reset();
  }

  getCurrentQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return {
      ...this.questions[this.currentQuestionIndex],
      questionNumber: this.currentQuestionIndex + 1,
      totalQuestions: this.questions.length,
    };
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    this.isFinished = true;
    return false;
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      return true;
    }
    return false;
  }

  goToQuestion(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
      return true;
    }
    return false;
  }

  selectAnswer(answer) {
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) return null;
    const isCorrect = answer === currentQuestion.correctAnswer;

    this.answers[this.currentQuestionIndex] = {
      question: currentQuestion.question,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: isCorrect,
      timestamp: new Date(),
    };

    if (isCorrect) {
      this.score++;
    }
    return {
      isCorrect: isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      score: this.score,
    };
  }

  isCurrentQuestionAnswered() {
    return this.answers[this.currentQuestionIndex] !== undefined;
  }

  getCurrentAnswer() {
    return this.answers[this.currentQuestionIndex] || null;
  }

  getAllAnswers() {
    return this.answers;
  }

  getScorePercentage() {
    if (this.questions.length === 0) return 0;
    return Math.round((this.score / this.questions.length) * 100);
  }

  getStats() {
    const answered = this.answers.filter((a) => a).length;
    return {
      totalQuestions: this.questions.length,
      answeredQuestions: answered,
      correctAnswers: this.score,
      incorrectAnswers: answered - this.score,
      unansweredQuestions: this.questions.length - answered,
      scorePercentage: this.getScorePercentage(),
      isComplete: answered === this.questions.length,
      isFinished: this.isFinished,
    };
  }

  reset() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.isFinished = false;
  }

  hasNextQuestion() {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  hasPreviousQuestion() {
    return this.currentQuestionIndex > 0;
  }

  getProgress() {
    return {
      current: this.currentQuestionIndex + 1,
      total: this.questions.length,
      percentage: Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100),
    };
  }

  finish() {
    this.isFinished = true;
    return this.getStats();
  }
}
