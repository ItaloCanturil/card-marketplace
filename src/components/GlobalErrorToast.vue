<script setup lang="ts">
import { errorStore } from '@/store/errorStore';
</script>

<template>
  <div v-if="errorStore.show" class="toast toast-center">
    <p>Error: {{ errorStore.error }}</p>
  </div>
</template>
