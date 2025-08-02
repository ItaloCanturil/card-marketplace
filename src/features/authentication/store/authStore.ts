import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { API_URL } from '@/config.ts';

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
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText);
      }

      const data = await login({
        email: credentials.email,
        password: credentials.password,
      });
      setAuthData(data);
      return data;

    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(credentials: { email: string; password: string }) {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText);
      }
      const data = await response.json();
      setAuthData(data);
      return data;
    } catch (err) {
      error.value = err.message;
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
    loading,
    error
  };
});
