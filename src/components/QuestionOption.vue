<script setup>
defineProps({
  option: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
  selectedAnswer: {
    type: String,
  }
});
</script>
<template>
  <span v-html="option"></span>
  <span
    v-if="selectedAnswer && option === correctAnswer"
    class="text-lg font-bold text-green-500"
    >✔&#xFE0E;</span
  >
  <span
    v-if="selectedAnswer && option === selectedAnswer && option !== correctAnswer"
    class="text-lg font-bold text-red-500"
    >✖&#xFE0E;</span
  >
</template>
