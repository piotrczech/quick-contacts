import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contact-info/list',
      component: () => import('../views/contact-info/ContactInfoListView.vue')
    }
  ]
})

export default router
