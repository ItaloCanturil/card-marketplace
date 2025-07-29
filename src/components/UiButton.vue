<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    variant?: 'accent' | 'outline' | string;
    customClass?: string;
    loading?: boolean;
  }>();

  const variantClass = computed(() => {
    if (props.variant === 'outline') return 'btn-outline text-accent border-accent hover:bg-accent hover:text-white'
    return 'btn-accent font-bold shadow-lg hover:shadow-xl'
  });
</script>

<template>
  <button :class="['btn', variantClass, customClass]" :loading="loading">
    <slot v-if="!loading"></slot>
    <span v-if="loading" class="loading loading-infinity loading-md"></span>
  </button>
</template>
