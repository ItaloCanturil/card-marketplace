<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import UiButton from './UiButton.vue'

  const router = useRouter()

  const login = () => {
    router.push('/auth/login')
  }

  const register = () => {
    router.push('/auth/register')
  }
</script>

<template>
  <header class="flex justify-between items-center p-4">
    <router-link to="/" class="inline-block text-white font-bold text-2xl hover:opacity-80 transition-opacity">
      CANTURIL
    </router-link>

    <div class="flex gap-2 flex-col sm:flex-row">
      <UiButton variant="accent" @click="login">Login</UiButton>
      <UiButton variant="outline" @click="register">Register</UiButton>
    </div>
  </header>
</template>
