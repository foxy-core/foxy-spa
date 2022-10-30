import { RouteRecordRaw } from 'vue-router'

import { AccountsPage } from '@@/domain/accounts'

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
