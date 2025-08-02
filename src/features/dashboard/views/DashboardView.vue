<script setup lang="ts">
  import MarketplaceBanner from '@/features/dashboard/components/MarketplaceBanner.vue';
  import Navbar from '@/components/Navbar.vue';
  import { computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const pageTitle = computed(() => {
    return route.meta.title || 'Marketplace';
  });
  const pageDescription = computed(() => {
    return route.meta.description;
  });
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <Navbar />
    <MarketplaceBanner :title="pageTitle" :description="pageDescription" />

    <router-view />
  </div>
</template>
