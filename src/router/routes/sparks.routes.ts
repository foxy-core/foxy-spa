import { SparksPage } from '@@/domain/sparks'
import { RouteRecordRaw } from 'vue-router'

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
