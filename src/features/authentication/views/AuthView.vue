<script setup lang="ts">
  import AuthForm from '../components/AuthForm.vue';
  import type { IAuthForm } from '../types';

  const handleSubmit = (form: IAuthForm) => {
    console.log('Form submitted:', form);
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
