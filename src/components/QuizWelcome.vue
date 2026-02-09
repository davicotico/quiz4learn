<template>
  <div class="max-w-2xl mx-auto p-8 text-center rounded-lg shadow-lg bg-white">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Quiz 4 Learn</h1>
    <p class="text-lg text-gray-700 mb-10">
      Bienvenido a nuestra plataforma de aprendizaje. Pon a prueba tus conocimientos con nuestros
      desafiantes quizzes.
    </p>
      <LoadingData v-if="isLoading"></LoadingData>
      <div class="flex flex-wrap justify-center gap-4" v-else>
        <button v-for="tema in categories" :key="tema.title" @click="iniciarQuiz(tema.name)"
          class="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md transition-all transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {{ tema.title }}
        </button>
      </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useQuizes } from '@/composables/quizes';
import LoadingData from './LoadingData.vue';

const { getQuizCategories, isLoading } = useQuizes();
const categories = ref([]);

const loadData = async () => {
  try {
    let data = await getQuizCategories();
    categories.value = data;
  } catch (e) {
    console.log(e);
  }
};
const emit = defineEmits(['start-quiz']);
const iniciarQuiz = (quizType) => {
  emit('start-quiz', quizType);
};
onMounted(() => {
  loadData();
});
</script>
