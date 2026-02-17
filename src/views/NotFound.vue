<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
<template>
  <div class="card">
    <h1>Not Fount!</h1>
    <button type="button" class="btn-primary" @click="router.push({ name: 'home' })">
      Ir a Inicio
    </button>
  </div>
</template>
