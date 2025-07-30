<script setup lang="ts">
  import NFLPlayerCard from '@/features/dashboard/components/NFLPlayerCard.vue';
  import { ICard } from '@/features/dashboard/components/NFLPlayerCard.vue';

  const cards: ICard[] = [
    {
      id: 1,
      image: '/cards/787952.webp',
      name: 'Tom Brady',
      team: 'NFL',
      position: 'QB'
    },
    {
      id: 2,
      image: '/cards/1462941a-88e3-4721-90fd-a1a84abf4a7f-GTY_1278501428 (1).webp',
      name: 'LeBron James',
      team: 'NBA',
      position: 'SF'
    },
    {
      id: 3,
      image: '/cards/ddl0tavs9qdkhr3t9w2e (1).webp',
      name: 'Stephen Curry',
      team: 'NBA',
      position: 'PG'
    },
    {
      id: 4,
      image: '/cards/download.webp',
      name: 'Kawhi Leonard',
      team: 'NBA',
      position: 'SF'
    },
    {
      id: 5,
      image: '/cards/download%20(1).webp',
      name: 'Giannis Antetokounmpo',
      team: 'NBA',
      position: 'PF'
    },
    {
      id: 6,
      image: '/cards/E371UGFUUAED7b0.webp',
      name: 'Luka Doncic',
      team: 'NBA',
      position: 'SF'
    },
    {
      id: 7,
      image: '/cards/images.webp',
      name: 'Nikola Jokic',
      team: 'NBA',
      position: 'C'
    }
  ]
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="flex items-center gap-4 w-full justify-end px-4">
      <label class="input">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" className="grow" placeholder="Search" />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
      <NFLPlayerCard v-for="card in cards" :key="card.id" :data="card" />
    </div>
  </div>
</template>
