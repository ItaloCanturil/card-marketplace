import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const authStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
  const token = ref(localStorage.getItem('token') || '');
  const error = ref(null);
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const getUserName = computed(() => user.value?.name || 'Guest');

  function setAuthData(data: { user: any; token: string }) {
    user.value = data.user;
    token.value = data.token;
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  }

  function clearAuthData() {
    user.value = null;
    token.value = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  async function register(credentials: { name: string; email: string; password: string }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/register', credentials);
      setAuthData(response.data);
      loading.value = false;
      return response.data;
    } catch (err) {
      error.value = err.message;
      loading.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(credentials: { email: string; password: string }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/login', credentials);
      setAuthData(response.data);
      loading.value = false;
      return response.data;
    } catch (err) {
      error.value = err.message;
      loading.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    isAuthenticated,
    user,
    getUserName,
    register,
    login,
    clearAuthData,
  };
});
