import { RouteRecordRaw } from 'vue-router'
import { AuthPage, PageAuthRequirements } from '@@/domain/auth'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    meta: {
      tag: AuthPage._TAG,
      auth: PageAuthRequirements.NotAuthorized,
    },
    children: [
      {
        name: AuthPage.SignIn,
        path: 'sign-in',
        component: () => import('@/pages/auth/sign-in-page.vue'),
      },
      {
        name: AuthPage.SignUp,
        path: 'sign-up',
        component: () => import('@/pages/auth/sign-up-page.vue'),
      },
    ],
  },
  {
    path: '/internal/redirect',
    meta: {
      tag: AuthPage._TAG,
      auth: PageAuthRequirements.NotAuthorized,
    },
    children: [
      {
        name: AuthPage.OauthVk,
        path: 'vk',
        component: () => import('@/pages/auth/oauth/oauth-vk-page.vue'),
      },
      {
        name: AuthPage.OauthTg,
        path: 'tg',
        component: () => import('@/pages/auth/oauth/oauth-tg-page.vue'),
      },
    ],
  },
]
