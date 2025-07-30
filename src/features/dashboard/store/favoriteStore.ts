import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<Set<string>>(new Set());

  const isFavorite = (id: string) => favorites.value.has(id);

  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      favorites.value.delete(id);
    } else {
      favorites.value.add(id);
    }

    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites.value)));
  };

  const loadFavorites = () => {
    const favoritesLocal = localStorage.getItem('favorites');
    if (favoritesLocal) {
      favorites.value = new Set(JSON.parse(favoritesLocal));
    }
  };

  loadFavorites();

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    loadFavorites,
  };
});
