<template>
  <component :is="layout" v-if="isRouterReady">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </component>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import AuthorizedLayout from '@/layouts/authorized-layout.vue'
  import DefaultLayout from '@/layouts/default-layout.vue'
  import { PageAuthRequirements } from '@@/domain/auth'
  import { NotificationType } from '@@/domain/notifications'
  import { CommonError } from '@@/infrastructure/dto/errors'
  import { exists } from '@@/shared/guards'
  import { unmountSplashScreen } from '@@/shared/splash'
  import { getAccessToken, useRefresh } from '@@/use-cases/auth'
  import { useNotify } from '@@/use-cases/notifications'
  import { providePokeApi } from '@@/use-cases/shared'

  useHead({
    titleTemplate: chunk => (chunk ? `${chunk} | Foxy` : 'Foxy'),
  })

  const pokeApi = providePokeApi()
  const refresh = useRefresh()
  const notify = useNotify()

  pokeApi._factory // prettier stop it pls
    .beforeEach(refresh)
    .beforeEach(input => ({
      ...input,
      meta: {
        ...(input.meta ?? {}),
        accessToken: getAccessToken(),
      },
    }))
    .onError(async e => {
      if (e.reason === CommonError.Unauthorized) {
        await refresh()
      } else {
        notify({
          text: `Неизвестная ошибка: ${e.reason}`,
          type: NotificationType.Warning,
        })
      }
    })

  const route = useRoute()

  const router = useRouter()

  const isRouterReady = ref(false)

  router.isReady().then(() => {
    isRouterReady.value = true

    unmountSplashScreen()
  })

  const layout = computed(() => {
    return (
      route.meta.layout ??
      (!exists(route.meta.auth) ||
      route.meta.auth === PageAuthRequirements.Authorized
        ? AuthorizedLayout
        : DefaultLayout)
    )
  })

  refresh()
</script>
