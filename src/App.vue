<script setup lang="ts">
  import UiToast from '@/components/UiToast.vue';

</script>

<template>
  <div
    className="min-h-screen min-w-screen w-full p-2 bg-[radial-gradient(125%_125%_at_50%_90%,_#000000_40%,_#0d1a36_100%)] flex flex-col">
    <RouterView />

    <UiToast />
  </div>
</template>

<style scoped></style>
