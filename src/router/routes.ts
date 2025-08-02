export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: '/auth',
        component: () => import('@/features/authentication/views/AuthView.vue'),
        redirect: '/auth/login',
        meta: { requiresGuest: true },
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import('@/features/authentication/views/AuthView.vue'),
          },
          {
            path: 'register',
            name: 'Register',
            component: () => import('@/features/authentication/views/AuthView.vue'),
          },
        ],
      }
    ],
  },
  {
    path: '/marketplace',
    name: 'home',
    component: () => import('@/features/dashboard/views/DashboardView.vue'),
    children: [
      {
        path: '/marketplace',
        name: 'Marketplace',
        component: () => import('@/features/dashboard/views/TradeView.vue'),
        meta: { title: 'Marketplace', description: 'Encontre todas as trocas disponíveis' },
      },
      {
        path: '/cards',
        name: 'Cards',
        component: () => import('@/features/dashboard/views/CardView.vue'),
        meta: { title: 'Cartas', description: 'Encontre todas as cartas disponíveis', requiresAuth: true },
      },
    ],
  }
];