import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);
  let nextId = 0;

  function addToast({
    message,
    type = 'info',
  }: Omit<Toast, 'id'>): void {
    const id = nextId++;
    toasts.value.push({
      id,
      message,
      type,
    });

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  function removeToast(id: number): void {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return {
    toasts,
    addToast,
    removeToast,
  }
})