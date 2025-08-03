<script setup lang="ts">
  import { computed } from 'vue';
  import type { ITrade } from '../types';
  import { formatDate } from '@/utils/formatDate';
  import { authStore } from '@/features/authentication/store/authStore';

  const props = defineProps<{
    trade: ITrade;
  }>();

  const emit = defineEmits(['deleteTrade']);

  const offering = computed(() => props.trade.tradeCards.filter((tradeCard) => tradeCard.type === 'OFFERING'));
  const receiving = computed(() => props.trade.tradeCards.filter((tradeCard) => tradeCard.type === 'RECEIVING'));
  const useTrades = computed(() => props.trade.userId === authStore().user.id);

  const handleDeleteTrade = async () => {
    try {
      emit('deleteTrade', props.trade.id);
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  }
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-4xl mx-auto min-h-68">
    <div class="flex items-end justify-between mb-4">
      <div>
        <p class="text-sm text-gray-500">User</p>
        <p class="font-semibold text-gray-800">{{ props.trade.user.name }}</p>
        <p class="text-sm text-gray-500">{{ formatDate(props.trade.createdAt) }}</p>
      </div>
      <button v-if="useTrades" class="btn btn-circle btn-sm bg-white text-error border-none hover:scale-110
        transition" @click="handleDeleteTrade">
        <span>🗑️</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-lg font-semibold mb-2 text-red-600">Enviando</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-4 bg-red-50 p-2 rounded-lg shadow-sm" v-for="tradeCard in offering"
            :key="tradeCard.id">
            <div>
              <p class="font-bold text-gray-700">{{ tradeCard.card.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-2 text-green-600">Recebendo</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-4 bg-green-50 p-2 rounded-lg shadow-sm" v-for="tradeCard in receiving"
            :key="tradeCard.id">
            <div>
              <p class="font-bold text-gray-700">{{ tradeCard.card.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>