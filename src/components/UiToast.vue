<script setup lang="ts">
  import { defineProps } from 'vue'
  import { useToastStore } from '../store/toastStore';

  defineProps<{
    variant?: 'success' | 'error' | 'warning' | 'info' | string;
    customClass?: string;
    label?: string;
  }>();

  const toastStore = useToastStore();

  const alertTypeClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'info':
      default:
        return 'alert-info';
    }
  };
</script>

<template>
  <div class="toast toast-bottom toast-right z-50">
    <transition-group name="toast-fade">
      <div v-for="toast in toastStore.toasts" :key="toast.id" :class="['alert', alertTypeClass(toast.type)]">
        <div class="flex items-center">
          <span v-if="toast.type === 'success'">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span v-if="toast.type === 'error'">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span v-if="toast.type === 'warning'">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </span>

          <span>{{ toast.message }}</span>
        </div>

        <button @click="toastStore.removeToast(toast.id)" class="ml-4 btn btn-xs btn-ghost">
          ✕
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>

  .toast-fade-enter-active,
  .toast-fade-leave-active {
    transition: all 0.5s ease;
  }

  .toast-fade-enter-from,
  .toast-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>