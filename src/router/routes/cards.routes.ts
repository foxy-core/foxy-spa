import { RouteRecordRaw } from 'vue-router'
import { CardsPage } from '@@/domain/cards'

export const cardsRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      tag: CardsPage._TAG,
    },
    children: [
      {
        name: CardsPage.Cards,
        path: '',
        component: () => import('@/pages/cards/cards-page.vue'),
      },
    ],
  },
]
