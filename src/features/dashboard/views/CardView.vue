<script setup lang="ts">
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
  import UiButton from '@/components/UiButton.vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import { computed, onMounted, ref } from 'vue';
  import Card from '../components/Card.vue';
  import Pagination from '@/components/Pagination.vue';

  const useMarketplace = useMarketplaceStore();

  const cards = computed(() => useMarketplace.cards);
  const filteredCards = ref<object[]>([]);
  const loading = computed(() => useMarketplace.loading);
  const cardsPagination = computed(() => useMarketplace.cardsPagination);

  const updatePage = async (page: number) => {
    await useMarketplace.fetchAllCards({ page });
  }

  const updateFilteredCards = (items: object[]) => {
    filteredCards.value = items;
  }

  onMounted(async () => {
    await useMarketplace.fetchAllCards();
  })
</script>

<template>
  <div class="flex flex-col items-center flex-1 w-full mt-10">
    <div class="flex items-center">
      <UiButton to="/me/cards">
        Minhas cartas
      </UiButton>

      <GlobalSearchInput :items="cards" :search-keys="['name', 'description']"
        @update:filtered-items="updateFilteredCards" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <Card v-if="!loading" v-for="card in filteredCards" :key="card.id" :data="card" />
      <div v-else v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>

    <div>
      <Pagination :page="cardsPagination.page" :more="cardsPagination.more" @update:page="updatePage" />
    </div>
  </div>

</template>