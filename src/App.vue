<template>
  <div class="flex min-h-screen flex-col font-sans bg-gray-100">
    <main class="flex-1">
      <div class="flex h-full w-full items-start sm:items-center justify-center p-5">
        <QuizCompleted
          v-if="quiz.isFinished"
          :score="quiz.score"
          :questions-length="quiz.questions.length"
          @restart="restartQuiz()"
        ></QuizCompleted>
        <div
          v-else-if="currentQuestion"
          class="w-full max-w-lg rounded-xl border border-gray-300 bg-white p-6 shadow-lg"
        >
          <div class="mb-4 flex items-center justify-between text-sm">
            <span class="rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600">{{
              currentQuestion.category
            }}</span>
            <span class="font-medium text-gray-600">
              Pregunta {{ quiz.getProgress().current }} de {{ quiz.getProgress().total }}</span
            >
          </div>
          <h2
            class="mb-5 text-xl font-bold leading-normal text-gray-900"
            v-html="currentQuestion.question"
          ></h2>
          <div class="flex flex-col gap-3">
            <QuestionOption
              :current-question="currentQuestion"
              @select-answer="selectAnswer($event)"
            ></QuestionOption>
          </div>

          <button
            v-if="quiz.getCurrentAnswer()"
            @click="nextQuestion"
            class="mt-6 w-full rounded-full bg-blue-600 px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-blue-700"
          >
            {{ isLastQuestion ? 'Finalizar Quiz' : 'Siguiente Pregunta' }}
          </button>
        </div>
      </div>
    </main>
    <PageFooter />
  </div>
  <DialogModal :open="isOpen" title="Error">
    <p>Error al cargar los datos desde desde opentrivia</p>
    <p>{{ error }}</p>
  </DialogModal>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import QuizCompleted from './components/QuizCompleted.vue';
import QuestionOption from './components/QuestionOption.vue';
import PageFooter from './components/PageFooter.vue';
import DialogModal from './components/DialogModal.vue';
import { useModal } from './composables/dialogs';
import { useOpentrivia } from './composables/opentrivia';
import { Quiz } from './utils/quiz';

const quiz = reactive(new Quiz());
const currentQuestion = computed(() => quiz.getCurrentQuestion());
const isLastQuestion = computed(() => quiz.currentQuestionIndex === quiz.questions.length - 1);

const { isOpen, openModal } = useModal();
const { getQuizData } = useOpentrivia();
const error = ref('');

const setupQuiz = async () => {
  try {
    let data = await getQuizData();
    quiz.loadQuestions(data.results);
  } catch (e) {
    error.value = e;
    openModal();
  }
};

const selectAnswer = (option) => {
  if (quiz.getCurrentAnswer()) {
    return;
  }
  quiz.selectAnswer(option);
};

const nextQuestion = () => {
  quiz.nextQuestion();
};

const restartQuiz = () => {
  setupQuiz();
};

onMounted(() => {
  setupQuiz();
});
</script>
