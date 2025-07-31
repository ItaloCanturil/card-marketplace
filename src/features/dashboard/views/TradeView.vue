<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import TradeCard from '../components/TradeCard.vue';
  import type { ITrade } from '../types';
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';

  const useMarketplace = useMarketplaceStore();
  const loading = computed(() => useMarketplace.loading);
  const trades = computed(() => useMarketplace.trades);
  const pagination = computed(() => useMarketplace.pagination);
  const filteredTrades = ref<ITrade[]>([]);

  const updateFilteredTrades = (items: ITrade[]) => {
    filteredTrades.value = items;
  }

  onMounted(async () => {
    await useMarketplace.getAllTrades();
  })
</script>

<template>
  <div class="w-full flex flex-col items-center flex-1 mt-10">
    <GlobalSearchInput :items="trades"
      :search-keys="['user.name', 'tradeCards.card.name', 'tradeCards.card.description']"
      @update:filtered-items="updateFilteredTrades" />

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <TradeCard v-if="!loading" v-for="trade in filteredTrades" :trade="trade" :key="trade.id" />
      <div v-else v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>

    <div>
      <div className="join">
        <button className="join-item btn" :disabled="pagination.page === 1">«</button>
        <button className="join-item btn">Page {{ pagination.page }}</button>
        <button className="join-item btn" :disabled="pagination.more">»</button>
      </div>
    </div>
  </div>
</template>
