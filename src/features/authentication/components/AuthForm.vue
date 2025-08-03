<script setup lang="ts">
  import { watch } from 'vue';
  import z from 'zod';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import UiButton from '@/components/UiButton.vue';

  const props = defineProps<{
    mode: 'login' | 'register';
    loading: boolean;
  }>();

  const emit = defineEmits(['submit']);

  const validationSchema = toTypedSchema(
    z.object({
      name: props.mode === 'register' ? z.string().min(2, 'Nome deve ter pelo menos 2 caracteres') : z.string().optional(),
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    })
  );

  const { handleSubmit, defineField, errors, meta, resetForm } = useForm({
    validationSchema,
  });

  const [name, nameAttrs] = defineField('name');
  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password')

  const onSubmit = handleSubmit(async (values) => {
    emit('submit', { ...values, mode: props.mode });
  });

  watch(() => props.mode, () => {
    resetForm();
  })
</script>

<template>
  <div class="flex justify-center">
    <form @submit.prevent="onSubmit" class="w-2xs flex flex-col gap-4">
      <div class="text-center text-3xl font-bold">
        {{ props.mode === 'login' ? 'Entre com suas credenciais' : 'Crie sua conta' }}
      </div>
      <div v-if="props.mode === 'register'">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Nome</legend>
          <input type="text" class="input" placeholder="Type here" v-model="name" :disabled="loading"
            v-bind="nameAttrs" />
          <p :class="{ 'opacity-100': errors.name }" class="text-red-500 opacity-0">
            {{ errors.name }}
          </p>
        </fieldset>
      </div>
      <div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Email</legend>
          <input type="email" class="input" placeholder="Type here" v-model="email" :disabled="loading"
            v-bind="emailAttrs" />
          <p :class="{ 'opacity-100': errors.email }" class="text-red-500 opacity-0">
            {{ errors.email }}
          </p>
        </fieldset>
      </div>
      <div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Senha</legend>
          <input type="password" class="input" placeholder="Type here" v-model="password" :disabled="loading"
            v-bind="passwordAttrs" />
          <p :class="{ 'opacity-100': errors.password }" class="text-red-500 opacity-0">
            {{ errors.password }}
          </p>
        </fieldset>
      </div>
      <UiButton custom-class="w-full" :loading="loading" @submit="onSubmit" :disabled="!meta.valid || loading">
        {{ props.mode === 'login' ? 'Entrar' : 'Criar conta' }}
      </UiButton>
    </form>
  </div>
</template>