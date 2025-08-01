<script setup lang="ts">
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
  import TradeCard from '../components/TradeCard.vue';
  import UiButton from '@/components/UiButton.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import type { ITrade } from '../types';
  import { authStore } from '@/features/authentication/store/authStore';
  import { useToastStore } from '@/store/toastStore';

  const useMarketplace = useMarketplaceStore();
  const useAuth = authStore();
  const useToast = useToastStore();
  const loading = computed(() => useMarketplace.loading);
  const trades = computed(() => useMarketplace.trades);
  const pagination = computed(() => useMarketplace.pagination);
  const filteredTrades = ref<ITrade[]>([]);

  const updateFilteredTrades = (items: ITrade[]) => {
    filteredTrades.value = items;
  }

  const handleCreateTrade = () => {
    if (!useAuth.isAuthenticated) {
      useToast.addToast({
        message: 'Você precisa estar logado para criar uma troca',
        type: 'error'
      })
    }
  }

  onMounted(async () => {
    await useMarketplace.getAllTrades();
  })
</script>

<template>
  <div class="w-full flex flex-col items-center flex-1 mt-10 p-4 gap-4">
    <div class="flex items-center">
      <UiButton variant="accent" @click="handleCreateTrade">
        Criar troca
      </UiButton>

      <GlobalSearchInput :items="trades"
        :search-keys="['user.name', 'tradeCards.card.name', 'tradeCards.card.description']"
        @update:filtered-items="updateFilteredTrades" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full place-items-center">
      <div v-if="filteredTrades.length === 0 && !loading">
        <div class="text-center">
          <p class="text-xl">Nenhuma troca encontrada</p>
        </div>
      </div>

      <TradeCard v-if="!loading" v-for="trade in filteredTrades" :trade="trade" :key="trade.id" />
      <div v-else v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>

    <div>
      <div class="join">
        <button class="join-item btn" :disabled="pagination.page === 1">«</button>
        <button class="join-item btn">{{ pagination.page }}</button>
        <button class="join-item btn" :disabled="pagination.more">»</button>
      </div>
    </div>
  </div>
</template>
