<script setup>
import confetti from 'canvas-confetti';
import { onMounted, ref } from 'vue';

const EXCELENT = 0.8;

const props = defineProps({
  score: {
    type: Number,
  },
  questionsLength: {
    type: Number,
  },
});
const nota = ref(0);
const emit = defineEmits(['restart']);
const restartQuiz = () => {
  emit('restart');
};

function calcularNota() {
  return props.score / props.questionsLength;
}

onMounted(() => {
  nota.value = calcularNota();
  if (nota.value >= EXCELENT) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
});
</script>

<template>
  <div class="w-full max-w-lg text-center">
    <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900">¡Quiz Completado!</h2>
      <p class="mt-2 text-lg text-gray-600">Tu puntuación final es:</p>
      <p class="my-2 text-4xl font-bold text-gray-900 sm:my-6 sm:text-5xl">
        {{ score }} / {{ questionsLength }}
      </p>
      <div v-if="nota >= EXCELENT">
        <h3 class="font-bold text-gray-500">¡Felicidades! Muy buena puntuación</h3>
      </div>
      <button
        @click="restartQuiz"
        class="mt-6 w-full rounded-full bg-blue-600 px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-blue-700"
      >
        Volver a Inicio
      </button>
    </div>
  </div>
</template>
