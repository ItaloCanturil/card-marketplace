<script setup lang="ts">
  import AuthForm from '../components/AuthForm.vue';
  import type { IAuthForm } from '../types';
  import { authStore } from '../store/authStore';
  import { useRouter } from 'vue-router';
  import { useToastStore } from '../../../store/toastStore';

  const useAuth = authStore();
  const toastStore = useToastStore();
  const router = useRouter();

  const handleSubmit = async (form: IAuthForm) => {
    console.log('Form submitted:', form);
    if (form.mode === 'login') {
      try {
        await useAuth.login(form);
      } catch (error) {
        console.log(error)
        toastStore.addToast({
          message: error instanceof Error ? error.message : 'Login failed',
          type: 'error',
        });
        return;
      }
      if (!useAuth.error) {
        toastStore.addToast({
          message: 'Login successful',
          type: 'success',
        });

        router.push({ name: 'home' });
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
  <div class="flex items-center justify-center flex-1">
    <div class="left-panel flex-1">
      <AuthForm :mode="$route.path === '/auth/login' ? 'login' : 'register'" @submit="handleSubmit"
        :loading="useAuth.loading" />
    </div>

    <div class="right-panel flex-1">
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl font-bold">
          {{ $route.path === '/auth/login' ? 'Entre com suas credenciais' : 'Crie sua conta' }}
        </div>
      </div>
    </div>

    <!-- <LoadingScreen v-if="useAuth.loading" /> -->
  </div>
</template>
