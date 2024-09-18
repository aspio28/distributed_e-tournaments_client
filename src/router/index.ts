import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tourttt'
    },
    {
      path: '/tourttt',
      name: 'tourttt',
      component: () => import('@/modules/menu/layouts/MenuLayout.vue')
    }
  ]
})

export default router
