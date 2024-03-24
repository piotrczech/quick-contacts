import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contact-info/list',
      component: () => import('../views/contact-info/ContactInfoListView.vue')
    },
    {
      path: '/contact-info/add',
      name: 'contact-info/add',
      component: () => import('../views/contact-info/ContactInfoAddView.vue')
    }
  ]
})

export default router
