<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import TradeCard from '../components/TradeCard.vue';

  const useMarketplace = useMarketplaceStore();
  const trades = computed(() => useMarketplace.trades);

  onMounted(async () => {
    await useMarketplace.getAllTrades();
  })
</script>

<template>
  <div class="w-full flex flex-col items-center flex-1 mt-10">
    <TradeCard v-for="trade in trades" :trade="trade" :key="trade.id" />
  </div>
</template>
