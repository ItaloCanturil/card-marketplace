<script setup lang="ts">
  import AuthForm from '../components/AuthForm.vue';
  import type { IAuthForm } from '../types';
  import { authStore } from '../store/authStore';

  const useAuth = authStore();

  const handleSubmit = (form: IAuthForm) => {
    console.log('Form submitted:', form);
    if (form.mode === 'login') {
      useAuth.login(form);
    } else {
      useAuth.register({
        name: form.name || '',
        email: form.email,
        password: form.password
      });
    }
  };
</script>

<template>
  <div class="flex items-center justify-center flex-1">
    <div class="left-panel flex-1">
      <AuthForm :mode="$route.path === '/auth/login' ? 'login' : 'register'" @submit="handleSubmit" />
    </div>

    <div class="right-panel flex-1">
      <div class="flex flex-col items-center justify-center">
        <div class="text-2xl font-bold">
          {{ $route.path === '/auth/login' ? 'Entre com suas credenciais' : 'Crie sua conta' }}
        </div>
      </div>
    </div>
  </div>
</template>
