import { createRouter, createWebHistory } from 'vue-router'
import BlogHome from '@/views/BlogHome.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlogHome,
      meta: { index: 0 },
    },
    {
      path: '/til',
      name: 'til',
      component: () => import('@/views/TILView.vue'),
      meta: { index: 1 },
    },
    {
      path: '/series',
      name: 'series',
      component: () => import('@/views/SeriesView.vue'),
      meta: { index: 2 },
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { index: 5 },
        },
        {
          path: 'explore',
          name: 'explore',
          component: () => import('@/views/ExploreView.vue'),
          meta: { index: 3 },
        },
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/views/TagsView.vue'),
          meta: { index: 4 },
        },
        {
          path: 'series',
          name: 'dashboard-series',
          component: () => import('@/views/DashboardSeriesView.vue'),
          meta: { index: 6 },
        },
      ],
    },
    // 호환성을 위한 리다이렉트
    {
      path: '/explore',
      redirect: '/dashboard/explore',
    },
    {
      path: '/tags',
      redirect: '/dashboard/tags',
    },
  ],
})

export default router
