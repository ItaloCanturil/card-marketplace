<script setup lang="ts">
  import { defineProps } from 'vue';

  defineProps({
    title: {
      type: String,
      default: 'Marketplace',
    },
    description: {
      type: String,
    },
  });
</script>

<template>
  <section class="wrap">
    <div class="bgContainer"></div>
    <div class="bronzeBorder lower"></div>
    <section class="inner py-8">
      <h1 class="font-bold text-3xl">{{ title }}</h1>
      <p class="text-sm">{{ description }}</p>
    </section>
  </section>
</template>

<style scoped>
  .wrap {
    @apply relative z-2 text-center w-full min-h-[8rem];

    clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 1rem), calc(50% + (70rem / 2) + 1rem) calc(100% - 1rem), calc(50% + (70rem / 2)) 100%, calc(50% - (70rem / 2)) 100%, calc(50% - (70rem / 2) - 1rem) calc(100% - 1rem), 0% calc(100% - 1rem));
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 1rem), calc(50% + (70rem / 2) + 1rem) calc(100% - 1rem), calc(50% + (70rem / 2)) 100%, calc(50% - (70rem / 2)) 100%, calc(50% - (70rem / 2) - 1rem) calc(100% - 1rem), 0% calc(100% - 1rem));
    margin: 0 0 -1rem 0;

    .inner {
      @apply relative;

      height: calc(100% - 8rem);
    }
  }

  .bgContainer {
    background-image: url('/public/bkg_cards-wt.jpg');
    position: absolute;
    z-index: -100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #888;
    background-repeat: no-repeat;
    background-position: 50% 80%;
    background-size: cover;
    overflow: hidden;
  }

  .bronzeBorder {
    position: absolute;
    z-index: 100;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background: linear-gradient(90deg, rgba(35, 20, 2, 0.85) 0%, rgba(35, 20, 2, 0) 50%), linear-gradient(270deg, rgba(35, 20, 2, 0.85) 0%, rgba(35, 20, 2, 0) 50%), radial-gradient(2em 1rem at calc(50% - (70rem / 2)) 0, rgba(255, 218, 0, 0.45), rgba(255, 255, 255, 0)), radial-gradient(6em 1rem at calc(50% + (70rem / 2)) 0, rgba(255, 240, 40, 0.45), rgba(255, 255, 255, 0)), radial-gradient(65rem 40% at 50% 50%, rgba(255, 218, 0, 0.75), rgba(255, 255, 255, 0)), linear-gradient(0, #774603 0%, rgba(119, 70, 3, 0) 40%), linear-gradient(180deg, #774603 0%, rgba(119, 70, 3, 0) 15%), #eac04e;
    clip-path: polygon(0% 0%, calc(50% - (70rem / 2) - 0.65rem) 0%, calc(50% - (70rem / 2) + 0.35rem) 1rem, calc(50% + (70rem / 2) - 0.35rem) 1rem, calc(50% + (70rem / 2) + 0.65rem) 0%, 100% 0%, 100% 100%, 0% 100%);
    -webkit-clip-path: polygon(0% 0%, calc(50% - (70rem / 2) - 0.65rem) 0%, calc(50% - (70rem / 2) + 0.35rem) 1rem, calc(50% + (70rem / 2) - 0.35rem) 1rem, calc(50% + (70rem / 2) + 0.65rem) 0%, 100% 0%, 100% 100%, 0% 100%);
  }
</style>