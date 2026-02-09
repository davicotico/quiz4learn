<template>
  <TransitionGroup name="list" type="animation">
    <div
      v-for="(option, index) in currentQuestion.options"
      :key="option"
      :style="{ '--delay': index }"
      class="list-item"
      :class="getOptionClasses(option)"
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
const getOptionClasses = (option) => {
  if (selectedAnswer.value === null) {
    return 'list-item-enabled';
  }
  let isCorrect = option === props.currentQuestion.correctAnswer;
  let isSelected = option === selectedAnswer.value;
  if (isCorrect) {
    return 'list-item-correct';
  }
  if (isSelected && !isCorrect) {
    return 'list-item-incorrect';
  }
  return 'list-item-disabled';
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

/* Para que al salir no haya retraso */
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
</style>
