import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GenerateQrView from '@/views/GenerateQrView.vue'
import ScannerQrView from '@/views/ScannerQrView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/generate',
      name: 'generate-qr',
      component: GenerateQrView,
    },
    {
      path: '/scanner',
      name: 'scanner-qr',
      component: ScannerQrView,
    },
  ],
})

export default router
