<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import UiButton from '@/components/UiButton.vue';
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
  import Card from '../components/Card.vue';
  import TradeModal from '../components/TradeModal.vue';
  import { authStore } from '@/features/authentication/store/authStore';

  const useAuth = authStore();
  const useMarketplace = useMarketplaceStore();
  const trades = computed(() => useMarketplace.userTrades);
  const filteredTrades = ref<object[]>([]);
  const loading = computed(() => useMarketplace.loading);
  const pagination = computed(() => useMarketplace.pagination);
  const showTradeModal = ref(false);

  const updateFilteredTrades = (items: object[]) => {
    filteredTrades.value = items;
  }

  const handleCreateTrade = () => {
    showTradeModal.value = true;
  }

  onMounted(async () => {
    await useMarketplace.fetchAllTrades();
    await useMarketplace.findUserTrades(useMarketplace.trades, useAuth.user.id);
  })
</script>

<template>
  <div class="flex flex-col items-center flex-1 w-full mt-10">
    <div class="flex items-center">
      <UiButton to="/marketplace">
        Todas as trocas
      </UiButton>

      <GlobalSearchInput :items="trades" :search-keys="['name', 'description']"
        @update:filtered-items="updateFilteredTrades" />
    </div>
    <div v-if="filteredTrades.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <Card v-if="!loading" v-for="trade in filteredTrades" :key="trade.id" :data="trade" />
      <div v-if="loading" v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>
    <div v-if="!loading && !filteredTrades.length" class="flex flex-col items-center justify-center mt-5">
      <h3>Nenhuma troca encontrada</h3>
      <UiButton variant="accent" @click="handleCreateTrade">
        Criar troca
      </UiButton>
    </div>

    <div class="mt-5" v-if="filteredTrades.length">
      <div class="join">
        <button class="join-item btn" :disabled="pagination.page === 1">«</button>
        <button class="join-item btn">{{ pagination.page }}</button>
        <button class="join-item btn" :disabled="pagination.more">»</button>
      </div>
    </div>

    <TradeModal :showModal="showTradeModal" @close="showTradeModal = false" />
  </div>

</template>