import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sobre-nosotros',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/paquetes',
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
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
