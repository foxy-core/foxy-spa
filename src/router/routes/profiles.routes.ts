import { ProfilesPage } from '@@/domain/profiles'
import { RouteRecordRaw } from 'vue-router'

export const profilesRoutes: RouteRecordRaw[] = [
  {
    path: '/account/profile',
    meta: { tag: ProfilesPage._TAG },
    children: [
      {
        name: ProfilesPage.EditProfile,
        path: '',
        component: () => import('@/pages/profile/edit-profile-page.vue'),
      },
      {
        name: ProfilesPage.CreateProfile,
        path: 'create',
        // component: () => import('@/pages/profile/create-profile-page.vue'),
        components: {
          default: () => import('@/pages/profile/create-profile-page.vue'),
          headerLeft: () =>
            import(
              '@/containers/profiles/create-profile-wizard/back-button.vue'
            ),
        },
      },
    ],
  },
]
