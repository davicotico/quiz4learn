<script setup>
import DialogModal from '@/components/DialogModal.vue';
import { useModal } from '@/composables/dialogs';
import { useQuizes } from '@/composables/quizes';
import { Quiz } from '@/utils/quiz';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toQuiz4Learn } from '@/utils/maps';
import QuizCompleted from '@/components/QuizCompleted.vue';
import LoadingData from '@/components/LoadingData.vue';
import QuestionOptionGroup from '@/components/QuestionOptionGroup.vue';
import AnswerExplanation from '@/components/AnswerExplanation.vue';
import { StorageSerializers, useLocalStorage } from '@vueuse/core';
import { shuffleArray } from '@/utils/utils';

const route = useRoute();
const router = useRouter();
const { isOpen, openModal } = useModal();
const { getQuizData, isLoading } = useQuizes();

const error = ref('');
const quiz = reactive(new Quiz());
const currentQuestion = computed(() => quiz.getCurrentQuestion());
const isLastQuestion = computed(() => quiz.currentQuestionIndex === quiz.questions.length - 1);

onMounted(() => {
  loadData(route.params.quiz);
});

onUnmounted(() => {
  quiz.questions = [];
  quiz.reset();
});

const loadData = async (quizName) => {
  const quizData = useLocalStorage(quizName, null, { serializer: StorageSerializers.object });
  if (quizData.value !== null) {
    let quizUpdated = quizData.value.map((item) => {
      item.options = shuffleArray(item.options)
      return item;
    });
    quiz.loadQuestions(shuffleArray(quizUpdated));
    return;
  }
  try {
    let data = await getQuizData(quizName);
    let mapQuestions = data.map(toQuiz4Learn);
    quiz.loadQuestions(mapQuestions);
    quizData.value = mapQuestions;
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
  router.push({ name: 'home' });
};
</script>
<template>
  <div class="card">
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
        <QuestionOptionGroup
          :current-question="currentQuestion"
          @select-answer="selectAnswer($event)"
        ></QuestionOptionGroup>
      </div>
      <AnswerExplanation
        v-if="quiz.getCurrentAnswer() && currentQuestion.explanation != undefined && currentQuestion.explanation != ''"
        :explanation="currentQuestion.explanation"
      />
      <button v-if="quiz.getCurrentAnswer()" @click="nextQuestion" class="btn-primary mt-6 w-full">
        {{ isLastQuestion ? 'Finalizar Quiz' : 'Siguiente Pregunta' }}
      </button>
      <button @click="restartQuiz()" class="mt-3 w-full btn-secondary">Volver a Inicio</button>
    </div>
    <LoadingData v-if="isLoading"></LoadingData>
    <DialogModal :open="isOpen" title="Error">
      <p>Error al cargar los datos</p>
      <p>{{ error }}</p>
    </DialogModal>
  </div>
</template>
