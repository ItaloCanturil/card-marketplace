<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useMarketplaceStore } from "../store/marketplaceStore";
import type { ICard } from "../types";
import Card from "../components/Card.vue";

const props = defineProps<{
    showModal: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const useMarketplace = useMarketplaceStore();
const offeringCard = ref<ICard | null>(null);
const receivingCard = ref<ICard | null>(null);
const cards = computed(() => useMarketplace.cards);
const userCards = computed(() => useMarketplace.userCards);

watch(() => props.showModal, (isShown) => {
  if (isShown) {
    useMarketplace.fetchUserCard();
    useMarketplace.fetchAllCards();
    offeringCard.value = null;
  }
});
</script>

<template>
    <dialog id="trade_modal" class="modal" :open="showModal" @close="emit('close')">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 class="font-bold text-lg text-center mb-4">Criar troca</h3>

        <div class="flex items-center gap-4 place-items-center">
            <div class="flex flex-col gap-2">
              <h4>Escolha a carta que quer trocar</h4>
              <select v-model="offeringCard" class="select">
                <option :value="card" v-for="card in userCards" :key="card.id">{{ card.name }}</option>
              </select>

              <Card v-if="offeringCard" :data="offeringCard" :noBorder="true" />
              <Card v-if="!offeringCard" :noBorder="true" />
            </div>
            <div class="divider divider-horizontal"></div>
            <div class="flex flex-col gap-2">
              <h4>Escolha a carta que quer receber</h4>
              <select v-model="receivingCard" class="select">
                <option :value="card" v-for="card in cards" :key="card.id">{{ card.name }}</option>
              </select>
              
              <Card v-if="receivingCard" :data="receivingCard" :noBorder="true" />
              <Card v-if="!receivingCard" :noBorder="true" />
            </div>
        </div>

        <div class="modal-action mt-6">
        <button 
          class="btn btn-primary w-full" 
          :disabled="!offeringCard || !receivingCard"
          @click="handleSubmit"
        >
          Enviar Proposta
        </button>
      </div>
      </div>
    </dialog>
</template>
