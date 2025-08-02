<script setup lang="ts">
  import AuthForm from '@/features/authentication/components/AuthForm.vue';
  import type { IAuthForm } from '@/features/authentication/types';
  import { authStore } from '@/features/authentication/store/authStore';
  import { useRouter } from 'vue-router';
  import { useToastStore } from '@/store/toastStore';
  import UiHeader from '@/components/UiHeader.vue';

  const useAuth = authStore();
  const toastStore = useToastStore();
  const router = useRouter();

  const handleSubmit = async (form: IAuthForm) => {
    if (form.mode === 'login') {
      try {
        await useAuth.login(form);

        if (useAuth.isAuthenticated) {
          router.push({ name: 'Marketplace' });
        }
      } catch (error) {
        console.log(error)
        toastStore.addToast({
          message: error instanceof Error ? error.message : 'Login failed',
          type: 'error',
        });
        return;
      }
    } else {
      try {
        await useAuth.register({
          name: form.name || '',
          email: form.email,
          password: form.password
        });
      } catch (error) {
        console.log(error)
        toastStore.addToast({
          message: error instanceof Error ? error.message : 'Registration failed',
          type: 'error',
        });
        return;
      }
    }
  };
</script>

<template>
  <div class="flex flex-col lg:flex-row items-center justify-center flex-1">

    <div
      class="flex flex-col justify-center left-panel w-full lg:w-1/2 bg-[url('/public/bg-monster1.png')] bg-cover min-h-screen bg-left lg:bg-none">
      <UiHeader class="lg:hidden" />
      <div class="flex-1"></div>
      <AuthForm :mode="$route.path === '/auth/login' ? 'login' : 'register'" @submit="handleSubmit"
        :loading="useAuth.loading" />
      <div class="flex-1"></div>
    </div>

    <div class="right-panel hidden lg:block lg:w-1/2 min-h-screen">
      <UiHeader />
    </div>

  </div>
</template>

<style scoped>
  .right-panel {
    background-image: url('/public/bg-monster1.png');
    background-size: cover;
    background-position: center;
    height: 100%;
  }
</style>