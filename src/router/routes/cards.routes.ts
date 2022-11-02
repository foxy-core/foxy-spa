import { RouteRecordRaw } from 'vue-router'

import CardsLayout from '@/layouts/cards-layout.vue'
import CardsPageComponent from '@/pages/cards/cards-page.vue'
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
        component: CardsPageComponent,
        meta: {
          layout: CardsLayout,
        },
      },
    ],
  },
]
