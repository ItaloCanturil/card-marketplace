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
    path: '/home',
    name: 'home',
    component: () => import('@/features/dashboard/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  }
];