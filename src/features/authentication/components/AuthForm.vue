<script setup lang="ts">
  import { reactive } from 'vue';
  import UiButton from '@/components/UiButton.vue';

  const props = defineProps<{
    mode: 'login' | 'register';
    loading: boolean;
  }>();

  const emit = defineEmits(['submit']);

  const form = reactive({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    emit('submit', { ...form, mode: props.mode });

    form.name = '';
    form.email = '';
    form.password = '';
  };
</script>

<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleSubmit">
      <div>{{ props.mode === 'login' ? 'Entre com suas credenciais' : 'Crie sua conta' }}</div>
      <div v-if="props.mode === 'register'">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Nome</legend>
          <input type="text" className="input" placeholder="Type here" v-model="form.name" />
          <p className="label">Adicione seu nome</p>
        </fieldset>
      </div>
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Email</legend>
          <input type="email" className="input" placeholder="Type here" v-model="form.email" />
          <p className="label">Adicione seu email</p>
        </fieldset>
      </div>
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Senha</legend>
          <input type="password" className="input" placeholder="Type here" v-model="form.password" />
          <p className="label">Adicione sua senha</p>
        </fieldset>
      </div>
      <UiButton custom-class="w-full" :loading="loading" @submit="handleSubmit">{{ props.mode === 'login' ? 'Entrar' :
        'Criar conta' }}
      </UiButton>
    </form>
  </div>
</template>