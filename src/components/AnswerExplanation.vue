<template>
  <div class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
    <h3 class="mb-1 text-sm font-bold uppercase tracking-wide text-gray-700">Explicación</h3>
    <p class="text-gray-800" v-html="explanation"></p>
  </div>
</template>
<script setup>
defineProps({
  explanation: {
    type: String,
    default: '',
  },
});
</script>
