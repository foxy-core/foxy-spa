import { RouteRecordRaw } from 'vue-router'

export const _404Routes: RouteRecordRaw[] = [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/404-page.vue'),
  },
]
