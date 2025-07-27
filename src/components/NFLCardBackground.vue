<script setup lang="ts">
  const cards = [
    {
      id: 1,
      image: '/cards/787952.webp',
    },
    {
      id: 2,
      image: '/cards/1462941a-88e3-4721-90fd-a1a84abf4a7f-GTY_1278501428 (1).webp',
    },
    {
      id: 3,
      image: '/cards/ddl0tavs9qdkhr3t9w2e (1).webp',
    },
    {
      id: 4,
      image: '/cards/download.webp',
    },
    {
      id: 5,
      image: '/cards/download%20(1).webp',
    },
    {
      id: 6,
      image: '/cards/E371UGFUUAED7b0.webp',
    },
    {
      id: 7,
      image: '/cards/images.webp',
    }
  ]
</script>

<template>
  <div class="absolute inset-0 z-0 overflow-hidden">
    <div class="flex flex-wrap justify-center items-center gap-6 h-full opacity-50">
      <img v-for="(card) in cards" :key="card.id" :src="card.image"
        class="w-40 rounded-xl shadow-lg object-cover select-none" alt="NFL card" />
      <img v-for="(card) in cards" :key="card.id" :src="card.image"
        class="w-40 rounded-xl shadow-lg object-cover select-none" alt="NFL card" />
    </div>
  </div>
</template>