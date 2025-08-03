<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMarketplaceStore } from '../store/marketplaceStore';
import UiButton from '@/components/UiButton.vue';
import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
import Card from '../components/Card.vue';

const useMarketplace = useMarketplaceStore();
const trades = computed(() => useMarketplace.userTrades);
const filteredTrades = ref<object[]>([]);
const loading = computed(() => useMarketplace.loading);
const showTradeModal = ref(false);

const updateFilteredTrades = (items: object[]) => {
  filteredTrades.value = items;
}

const handleCreateTrade = () => {
    showTradeModal.value = true;
  }

onMounted(async () => {
  await useMarketplace.fetchUserTrades();
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
    <div v-if="filteredTrades.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <Card v-if="!loading" v-for="trade in filteredTrades" :key="trade.id" :data="trade" />
      <div v-if="loading" v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>
    <div v-if="!loading && !filteredTrades.length" class="flex flex-col items-center justify-center mt-5">
        <h3>Nenhuma troca encontrada</h3>
        <UiButton variant="accent" @click="handleCreateTrade">
          Criar troca
        </UiButton>
      </div>
  </div>

</template>