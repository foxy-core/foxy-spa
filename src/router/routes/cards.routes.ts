import { RouteRecordRaw } from 'vue-router'
import { CardsPage } from '@@/domain/cards'
import CardsPageComponent from '@/pages/cards/cards-page.vue'

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
      },
    ],
  },
]
