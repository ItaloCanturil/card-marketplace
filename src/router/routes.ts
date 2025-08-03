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
    name: 'Dashboard',
    component: () => import('@/features/dashboard/layout/DashboardLayout.vue'),
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
      {
        path: '/me',
        name: 'Profile',
        component: () => import('@/features/dashboard/views/ProfileView.vue'),
        meta: { title: 'Perfil', description: '', requiresAuth: true },
      },
      {
        path: '/me/cards',
        name: 'ProfileCards',
        component: () => import('@/features/dashboard/views/ProfileCardView.vue'),
        meta: { title: 'Minhas cartas', description: '', requiresAuth: true },
      },
      {
        path: '/me/trades',
        name: 'ProfileTrades',
        component: () => import('@/features/dashboard/views/ProfileTradeView.vue'),
        meta: { title: 'Minhas trocas', description: '', requiresAuth: true },
      }
    ],
  }
];