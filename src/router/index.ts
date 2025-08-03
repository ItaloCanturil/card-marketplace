import { createRouter, createWebHistory } from "vue-router";
import { routes } from './routes';
import { authStore } from '@/features/authentication/store/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const useAuth = authStore();

  if (to.meta.requiresGuest && useAuth.isAuthenticated) {
    next({ name: 'Marketplace' });
  }

  if (to.meta.requiresAuth && !useAuth.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});


export default router;