import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authClient } from '@/lib/auth-client'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      beforeEnter: async () => {
        const session = await authClient.getSession()
        const isAuthenticated = Boolean(session.data)

        if (isAuthenticated) {
          return { name: 'home' }
        }
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../views/auth/SignUpView.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          component: () => import('../views/NotFoundView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/AdminLayout.vue'),
      beforeEnter: async () => {
        const session = await authClient.getSession()
        const isAuthenticated = Boolean(session.data)

        if (!isAuthenticated) {
          return { name: 'login' }
        }
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'sobre-nosotros',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'paquetes',
          name: 'packages',
          children: [
            {
              path: '',
              name: 'packagesList',
              component: () => import('../views/packages/PackageListView.vue'),
            },
            {
              path: 'nuevo',
              name: 'newPackage',
              component: () => import('../views/packages/NewPackageView.vue'),
            },
            {
              path: ':id',
              name: 'packageDetail',
              component: () => import('../views/packages/PackageDetailView.vue'),
            },
            {
              path: ':id/editar',
              name: 'editPackage',
              component: () => import('../views/packages/PackageEditView.vue'),
            },
          ],
        },
        {
          path: ':pathMatch(.*)*',
          component: () => import('../views/NotFoundView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
