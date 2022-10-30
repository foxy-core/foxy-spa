import { RouteRecordRaw } from 'vue-router'

import { PageAuthRequirements } from '@@/domain/auth'

export const _404Routes: RouteRecordRaw[] = [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/404-page.vue'),
    meta: {
      auth: PageAuthRequirements.NotAuthorized,
    },
  },
]
