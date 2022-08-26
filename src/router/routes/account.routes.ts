import { AccountsPage } from '@@/domain/accounts'
import { RouteRecordRaw } from 'vue-router'

export const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/account',
    meta: { tag: AccountsPage._TAG },
    children: [
      {
        name: AccountsPage.MyAccount,
        path: '',
        component: () => import('@/pages/account/my-account-page.vue'),
      },
    ],
  },
]
