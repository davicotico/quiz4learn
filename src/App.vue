<template>
  <div class="app">
    <main class="flex-1">
      <RouterView />
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import PageFooter from './components/PageFooter.vue';
</script>
