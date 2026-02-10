<script setup>
import QuizWelcome from '@/components/QuizWelcome.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const startQuiz = (quizName) => {
  router.push({ name: 'quiz', params: { quiz: quizName }});
};

</script>
<template>
  <div class="card">
    <QuizWelcome @start-quiz="startQuiz($event)"></QuizWelcome>
  </div>
</template>
