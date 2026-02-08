<template>
  <div class="flex min-h-screen flex-col font-sans bg-gray-100">
    <main class="flex-1">
      <div class="flex h-full w-full items-start sm:items-center justify-center p-5">
        <QuizWelcome v-if="!quizStarted" @start-quiz="startQuiz($event)"></QuizWelcome>
        <QuizCompleted
          v-if="quiz.isFinished"
          :score="quiz.score"
          :questions-length="quiz.questions.length"
          @restart="restartQuiz()"
        ></QuizCompleted>

          <div
            v-else-if="quizStarted && currentQuestion"
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
            <QuestionExplanation
              v-if="quiz.getCurrentAnswer() && currentQuestion.explanation != undefined"
              :explanation="currentQuestion.explanation"
            ></QuestionExplanation>
            <button
              v-if="quiz.getCurrentAnswer()"
              @click="nextQuestion"
              class="mt-6 w-full rounded-full bg-blue-600 px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-blue-700"
            >
              {{ isLastQuestion ? 'Finalizar Quiz' : 'Siguiente Pregunta' }}
            </button>

            <button
              @click="restartQuiz()"
              class="mt-3 w-full rounded-full bg-gray-400 px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-gray-500"
            >
              Volver a Inicio
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
import QuizWelcome from './components/QuizWelcome.vue';
import QuizCompleted from './components/QuizCompleted.vue';
import QuestionOption from './components/QuestionOption.vue';
import QuestionExplanation from './components/QuestionExplanation.vue';
import PageFooter from './components/PageFooter.vue';
import DialogModal from './components/DialogModal.vue';
import { useModal } from './composables/dialogs';
import { Quiz } from './utils/quiz';
import { toQuiz4Learn } from './utils/maps';
import { useQuizes } from './composables/quizes';

const quiz = reactive(new Quiz());
const quizStarted = ref(false);
const currentQuestion = computed(() => quiz.getCurrentQuestion());
const isLastQuestion = computed(() => quiz.currentQuestionIndex === quiz.questions.length - 1);

const { isOpen, openModal } = useModal();
const { getQuizData } = useQuizes();
const error = ref('');

const startQuiz = (quizName) => {
  quizStarted.value = true;
  loadData(quizName);
};

const loadData = async (quizName) => {
  try {
    let data = await getQuizData(quizName);
    quiz.loadQuestions(data.map(toQuiz4Learn));
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
  quizStarted.value = false;
  quiz.questions = [];
  quiz.reset();
};

onMounted(() => {});
</script>
