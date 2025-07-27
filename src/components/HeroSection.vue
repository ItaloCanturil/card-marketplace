<script setup lang="ts">
  import NFLCardBackground from './NFLCardBackground.vue';
  import UiButton from './UiButton.vue'
</script>

<template>
  <div class="flex flex-col flex-1">
    <NFLCardBackground />
    <div class="z-1 flex flex-1 flex-col">
      <div class="flex flex-col gap-5 items-center justify-center flex-grow">
        <div class="text-center">
          <h1 class="text-4xl font-bold">Welcome to Card Marketplace</h1>
          <p class="text-xl">Find and buy the best cards in the market</p>
        </div>

        <UiButton variant="accent">
          Get Started
        </UiButton>
      </div>
    </div>
  </div>
</template>