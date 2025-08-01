<script setup lang="ts">
  import CardBackground from './CardBackground.vue';
  import UiButton from './UiButton.vue'
</script>

<template>
  <div class="flex flex-col flex-1">
    <CardBackground />
    <div class="z-1 flex flex-1 flex-col">
      <div class="flex flex-col gap-5 items-center justify-center flex-grow">
        <div class="text-center">
          <h1 class="text-4xl font-bold">Bem vindo ao Marketplace de cartas</h1>
          <p class="text-xl">Procure e encontre as melhores cartas</p>
        </div>

        <UiButton variant="accent" to="/marketplace">
          Começar
        </UiButton>
      </div>
    </div>
  </div>
</template>