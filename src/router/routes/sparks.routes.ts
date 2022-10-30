import { RouteRecordRaw } from 'vue-router'

import { SparksPage } from '@@/domain/sparks'

export const sparksRoutes: RouteRecordRaw[] = [
  {
    path: '/sparks',
    meta: { tag: SparksPage._TAG },
    children: [
      {
        name: SparksPage.Sparks,
        path: '',
        component: () => import('@/pages/sparks/sparks-page.vue'),
      },
    ],
  },
]
