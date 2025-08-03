<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useMarketplaceStore } from '../store/marketplaceStore';
  import UiButton from '@/components/UiButton.vue';
  import GlobalSearchInput from '@/components/GlobalSearchInput.vue';
  import Card from '../components/Card.vue';
  import CardModal from '../components/CardModal.vue';

  const useMarketplace = useMarketplaceStore();
  const cards = computed(() => useMarketplace.userCards);
  const filteredCards = ref<object[]>([]);
  const loading = computed(() => useMarketplace.loading);
  const showModal = ref(false);

  const updateFilteredCards = (items: object[]) => {
    filteredCards.value = items;
  }

  const handleCreateCard = () => {
    showModal.value = true;
  }

  onMounted(async () => {
    await useMarketplace.fetchUserCard();
  })
</script>

<template>
  <div class="flex flex-col items-center flex-1 w-full mt-10">
    <div class="flex items-center">
      <UiButton to="/cards">
        Todas as cartas
      </UiButton>

      <GlobalSearchInput :items="cards" :search-keys="['name', 'description']"
        @update:filtered-items="updateFilteredCards" />
    </div>
    <div v-if="filteredCards"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full place-items-center">
      <Card v-if="!loading" v-for="card in filteredCards" :key="card.id" :data="card" />
      <div v-if="loading" v-for="i in 10" :key="i" class="skeleton w-full h-64 rounded-md"></div>
    </div>
    <div v-if="!loading && !filteredCards" class="flex flex-col items-center justify-center mt-5">
      <h3>Nenhuma carta encontrada</h3>
      <UiButton @click="handleCreateCard">
        Adicionar carta
      </UiButton>
    </div>

    <CardModal :showModal="showModal" @close="showModal = false" />
  </div>

</template>