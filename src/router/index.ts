import { createRouter, createWebHistory } from 'vue-router'
import BlogList from '@/modules/blog/views/BlogHome.vue'
import TILView from '@/modules/blog/views/TILView.vue'
import SeriesView from '@/modules/blog/views/SeriesView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/pages/home/index.vue')
  // },
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/signup/index.vue')
  },
  {
    path: '/signup/email',
    name: 'email-signup',
    component: () => import('@/pages/signup/email/index.vue')
  },
  {
    path: '/signup/verification',
    name: 'email-verification',
    component: () => import('@/pages/signup/verification/index.vue')
  },
  {
    path: '/signup/additional-info',
    name: 'additional-info',
    component: () => import('@/pages/signup/additional-info/index.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index.vue')
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import('@/pages/password-reset/index.vue')
  },
  {
    path: '/password-reset/verification',
    name: 'password-reset-verification',
    component: () => import('@/pages/password-reset/verification/index.vue')
  },
  {
    path: '/password-reset/new',
    name: 'password-reset-new',
    component: () => import('@/pages/password-reset/new/index.vue')
  },
  {
    path: '/password-reset/complete',
    name: 'password-reset-complete',
    component: () => import('@/pages/password-reset/complete/index.vue')
  },
  { path: '/blog', component: BlogList },
  { path: '/til', component: TILView },
  { path: '/series', component: SeriesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 