<script lang="ts" setup>
  import { computed, ref, watch } from "vue";
  import { useMarketplaceStore } from "../store/marketplaceStore";
  import type { ICard } from "../types";
  import Card from "../components/Card.vue";
  import { useToastStore } from "@/store/toastStore";

  const props = defineProps<{
    showModal: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const useToast = useToastStore();
  const useMarketplace = useMarketplaceStore();
  const offeringCard = ref<ICard | null>(null);
  const receivingCard = ref<ICard | null>(null);
  const cards = computed(() => useMarketplace.cards);

  const handleSubmit = async () => {
    await useMarketplace.addCard([receivingCard.value!.id]);
    if (useMarketplace.error) {
      useToast.addToast({
        message: useMarketplace.error.message,
        type: 'error',
      });
      return
    }
    useToast.addToast({
      message: 'Carta adicionada com sucesso',
      type: 'success',
    });
    emit('close');
  }

  watch(() => props.showModal, (isShown) => {
    if (isShown) {
      useMarketplace.fetchAllCards();
      offeringCard.value = null;
    }
  });
</script>

<template>
  <dialog id="trade_modal" class="modal" :open="showModal" @close="emit('close')">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-lg text-center mb-4">Criar troca</h3>

      <div class="flex flex-col items-center gap-2">
        <h4>Escolha a carta que quer adicionar</h4>
        <select v-model="receivingCard" class="select">
          <option :value="card" v-for="card in cards" :key="card.id">{{ card.name }}</option>
        </select>

        <div class="w-64">
          <Card v-if="receivingCard" :data="receivingCard" :noBorder="true" />
          <Card v-if="!receivingCard" :noBorder="true" />
        </div>
      </div>

      <div class="modal-action mt-6">
        <button class="btn btn-primary w-full" :disabled="!receivingCard" @click="handleSubmit">
          Adicionar carta
        </button>
      </div>
    </div>
  </dialog>
</template>
