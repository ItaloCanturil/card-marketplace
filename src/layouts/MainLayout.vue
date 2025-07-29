<script setup lang="ts">
  import UiHeader from '@/components/UiHeader.vue'
</script>

<template>
  <div class="flex flex-1 flex-col relative">
    <UiHeader />

    <router-view />
  </div>
</template>