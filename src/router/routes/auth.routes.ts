import { RouteRecordRaw } from 'vue-router'
import { AuthPage, PageAuthRequirements } from '@@/domain/auth'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    meta: {
      tag: AuthPage._TAG,
    },
    children: [
      {
        name: AuthPage.SignIn,
        path: 'sign-in',
        component: () => import('@/pages/auth/sign-in-page.vue'),
        meta: {
          auth: PageAuthRequirements.NotAuthorized,
        },
      },
      {
        name: AuthPage.SignUp,
        path: 'sign-up',
        component: () => import('@/pages/auth/sign-up-page.vue'),
        meta: {
          auth: PageAuthRequirements.NotAuthorized,
        },
      },
    ],
  },
]
