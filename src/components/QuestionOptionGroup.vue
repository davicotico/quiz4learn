<template>
  <TransitionGroup name="list" type="animation">
    <div
      v-for="(option, index) in currentQuestion.options"
      :key="option"
      :style="{ '--delay': index }"
      :class="getOptionClass(option)"
      @click="selectAnswer(option)"
    >
      <QuestionOption
        :option="option"
        :correct-answer="currentQuestion.correctAnswer"
        :selected-answer="selectedAnswer"
      ></QuestionOption>
    </div>
  </TransitionGroup>
</template>
<script setup>
import { ref, watch } from 'vue';
import QuestionOption from './QuestionOption.vue';

const props = defineProps({
  currentQuestion: {
    type: Object,
  },
});

const emit = defineEmits(['selectAnswer']);

const selectedAnswer = ref(null);

const selectAnswer = (option) => {
  if (selectedAnswer.value) return;
  selectedAnswer.value = option;
  emit('selectAnswer', option);
};

const getOptionClass = (option) => {
  const baseClasses =
    'flex justify-between items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 font-medium select-none';

  if (selectedAnswer.value === null) {
    return `${baseClasses} border-gray-300 hover:bg-gray-50 hover:border-gray-400`;
  }

  const isCorrect = option === props.currentQuestion.correctAnswer;
  const isSelected = option === selectedAnswer.value;

  if (isCorrect) {
    return `${baseClasses} bg-green-50 border-green-500 text-green-700 font-bold cursor-default`;
  }

  if (isSelected && !isCorrect) {
    return `${baseClasses} bg-red-50 border-red-500 text-red-700 font-bold cursor-default`;
  }

  return `${baseClasses} border-gray-300 opacity-60 bg-gray-100 cursor-default pointer-events-none`;
};
watch(
  () => props.currentQuestion,
  () => {
    selectedAnswer.value = null;
  },
);
</script>
<style scoped>
.list-enter-active {
  transition: all 0.5s ease;
  /* Multiplicamos el índice por el tiempo de retraso deseado */
  transition-delay: calc(var(--delay) * 0.2s);
}

/* Para que al salir no haya retraso (opcional) */
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>
