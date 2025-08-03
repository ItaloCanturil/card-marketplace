<script setup lang="ts">

  const props = defineProps({
    page: {
      type: Number,
      default: 1
    },
    more: {
      type: Boolean,
      default: false
    }
  });

  const emit = defineEmits(['update:page']);

  const handlePagination = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      emit('update:page', props.page - 1);
    } else {
      emit('update:page', props.page + 1);
    }
  }
</script>

<template>
  <div class="join">
    <button class="join-item btn" :disabled="props.page === 1" @click="handlePagination('prev')">«</button>
    <button class="join-item btn">{{ props.page }}</button>
    <button class="join-item btn" :disabled="!props.more" @click="handlePagination('next')">»</button>
  </div>
</template>