import { useFavoriteStore } from '@/features/dashboard/store/favoriteStore';

export function useFavorite() {
  const favoriteStore = useFavoriteStore();

  return {
    favorites: favoriteStore.favorites,
    isFavorite: favoriteStore.isFavorite,
    toggleFavorite: favoriteStore.toggleFavorite,
  }
}