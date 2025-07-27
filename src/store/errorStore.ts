import { defineStore } from 'pinia';
import { ref } from 'vue';

export const errorStore = defineStore("error", () => {
  const error = ref<string | null>(null);
  const show = ref<boolean>(false);

  function setError(err: string) {
    error.value = err;
    show.value = true;
  }

  function clearError() {
    error.value = null;
    show.value = false;
  }

  return {
    error,
    show,
    setError,
    clearError,
  }
});
