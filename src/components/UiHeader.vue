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
  <header class="flex justify-between items-center">
    <span />

    <div class="flex gap-2">
      <UiButton variant="accent" @click="login">Login</UiButton>
      <UiButton variant="outline" @click="register">Register</UiButton>
    </div>
  </header>
</template>
