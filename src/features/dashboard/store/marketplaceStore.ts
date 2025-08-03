import { defineStore } from 'pinia'
import { API_URL } from '@/config'
import type { Card, ITrade } from '../types';
import { reactive, ref } from 'vue';

export const useMarketplaceStore = defineStore('marketplace', () => {
  const trades = ref<Array<ITrade>>([]);
  const cards = ref<Array<Card>>([]);
  const userCards = ref<Array<Card>>([]);
  const userTrades = ref<Array<ITrade>>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const token = ref(localStorage.getItem('token'));
  const pagination = reactive({
    rpp: 10,
    page: 1,
    more: false,
  });

  async function fetchAllCards({ page = 1, rpp = 10 } = {}) {
    loading.value = true;
    error.value = null;
    try {
      const queryString = `?page=${page}&rpp=${rpp}`;

      const response = await fetch(`${API_URL}/cards${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      const data = await response.json();
      cards.value = data.list;
      pagination.more = data.more;
      pagination.page = page;
      pagination.rpp = rpp;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function fetchUserCard() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/cards/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      userCards.value = await response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function addCard(params: { cardIds: string[] }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/me/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        fetchUserCard();
      }
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchAllTrades({ page = 1, rpp = 10 } = {}) {
    loading.value = true;
    error.value = null;
    try {
      const queryString = `?page=${page}&rpp=${rpp}`;

      const response = await fetch(`${API_URL}/trades${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      });

      const data = await response.json();
      trades.value = data.list;
      pagination.more = data.more;
      pagination.page = page;
      pagination.rpp = rpp;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function findUserTrades(data: ITrade[], userId: string) {
    userTrades.value = data.filter((trade) => trade.userId === userId);
    return userTrades.value;
  }

  async function deleteTrade(params: { id: string }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/trades/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function createTrade(params: {
    cards: Array<{
      cardId: string;
      type: 'OFFERING' | 'RECEIVING';
    }>;
  }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/trades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      return response.json();
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  return {
    cards,
    trades,
    userCards,
    userTrades,
    loading,
    error,
    pagination,
    fetchAllCards,
    fetchUserCard,
    fetchAllTrades,
    findUserTrades,
    addCard,
    deleteTrade,
    createTrade,
  };
})