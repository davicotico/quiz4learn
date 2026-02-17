<template>
  <div class="app">
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.name"></component>
        </Transition>
        </RouterView>
    </main>
    <PageFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import PageFooter from './components/PageFooter.vue';
</script>
