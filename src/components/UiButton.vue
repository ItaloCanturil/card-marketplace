<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router';

  const props = defineProps<{
    variant?: 'accent' | 'outline' | string;
    customClass?: string;
    loading?: boolean;
    to?: string;
  }>();

  const tagType = computed(() => {
    if (props.to) {
      return RouterLink;
    }
    return 'button';
  });

  const variantClass = computed(() => {
    if (props.variant === 'accent') return 'btn-accent text-white';
    if (props.variant === 'outline') return 'btn-outline text-accent border-accent hover:bg-accent hover:text-white'
    return 'btn-accent font-bold shadow-lg hover:shadow-xl'
  });
</script>

<template>
  <component :is="tagType" :to="to" :class="['btn', variantClass, customClass]" :loading="loading" v-bind="$attrs">
    <slot v-if="!loading"></slot>
    <span v-if="loading" class="loading loading-infinity loading-md"></span>
  </component>
</template>
