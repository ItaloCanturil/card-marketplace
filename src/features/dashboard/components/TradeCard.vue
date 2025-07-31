<script setup lang="ts">
  import type { ITrade } from '../types';

  defineProps<{
    trade: ITrade;
  }>()

</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-4xl mx-auto w-68">
    <div class="flex items-end justify-between mb-4">
      <div>
        <p class="text-sm text-gray-500">User</p>
        <p class="font-semibold text-gray-800">{{ trade.user.name }}</p>
      </div>
      <div class="text-sm text-gray-500">
        <p>29 de Julho de 2025</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-for="tradeCard in trade.tradeCards">
      <div v-if="tradeCard.type === 'OFFERING'">
        <h3 class="text-lg font-semibold mb-2 text-red-600">Enviando</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-4 bg-red-50 p-2 rounded-lg shadow-sm">
            <div>
              <p class="font-bold text-gray-700">{{ tradeCard.card.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tradeCard.type === 'RECEIVING'">
        <h3 class="text-lg font-semibold mb-2 text-green-600">Recebendo</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-4 bg-green-50 p-2 rounded-lg shadow-sm">
            <div>
              <p class="font-bold text-gray-700">{{ tradeCard.card.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>