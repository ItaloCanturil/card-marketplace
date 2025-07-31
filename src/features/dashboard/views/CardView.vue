<script setup lang="ts">
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import { computed, onMounted, ref } from 'vue';
  import Card from '../components/Card.vue';

  const useMarketplace = useMarketplaceStore();

  const cards = computed(() => useMarketplace.cards);
  const filteredCards = ref<object[]>([]);
  const loading = computed(() => useMarketplace.loading);

  const updateFilteredCards = (items: object[]) => {
    filteredCards.value = items;
  }

  onMounted(async () => {
    await useMarketplace.getAllCards();
  })
</script>

<template>
  <div class="flex flex-col items-center flex-1 w-full">
    <GlobalSearchInput :items="cards" :search-keys="['name', 'description']"
      @update:filtered-items="updateFilteredCards" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <Card v-if="!loading" v-for="card in filteredCards" :key="card.id" :data="card" />
      <div v-else v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>
  </div>

</template>