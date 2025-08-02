<template>
  <div :class="{'bg-transparent': !noBorder}" class="h-80 gap-2 flex flex-col perspective bg-white px-2 py-4 rounded-lg">
    <div class="relative w-full h-full duration-500 transform-style-preserve-3d" :class="{ 'rotate-y-180': flipped }"
      @click="flipCard">
      <div class="absolute w-full h-full backface-hidden bg-base-100 rounded-xl shadow-xl overflow-hidden">
        <figure class=" rounded">
          <img :src="data.imageUrl" alt="NFL Player" class="w-full h-full object-cover" />

          <button v-if="!noBorder" @click.stop="toggleFavorite(data.id)"
            class="absolute top-2 right-2 btn btn-circle btn-sm bg-white text-error border-none hover:scale-110 transition">
            <span v-if="isFavorite(data.id)">❤️</span>
            <span v-else>🤍</span>
          </button>
        </figure>

        <div class="flex items-center justify-between px-2 mt-2">
          <span class="text-xs">{{ data.name }}</span>
          <span class="badge badge-outline badge-sm">{{ data.createdAt }}</span>
        </div>
      </div>

      <div v-if="!noBorder"
        class="absolute w-full h-full backface-hidden bg-neutral text-neutral-content rounded-xl shadow-xl transform rotate-y-180 flex flex-col items-center justify-center p-3 text-center">
        <h2 class="text-sm font-bold">{{ data.name }}</h2>
        <p class="text-xs">{{ data.description }}</p>
      </div>
    </div>

    <p v-if="!noBorder" class="text-xs text-base-100 text-center">Clique na carta para ver mais informações</p>

  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useFavorite } from '../composables/useFavorite'
  import type { ICard } from '../types'

  defineProps({
    data: {
      type: Object as () => ICard,
      default: () => ({
        id: 0,
        imageUrl: '/no-card.png',
        name: '',
        description: '',
        createdAt: ''
      })
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  })

  const flipped = ref(false)
  const flipCard = () => {
    flipped.value = !flipped.value
  }

  const { isFavorite, toggleFavorite } = useFavorite();
</script>

<style scoped>
  .perspective {
    perspective: 1000px;
  }

  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }
</style>
