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

  import { exists } from '@@/shared/guards'
  import { PageAuthRequirements } from '@@/domain/auth'
  import { providePokeApi } from '@@/use-cases/shared'
  import { getAccessToken, useRefresh } from '@@/use-cases/auth'
  import { unmountSplashScreen } from '@@/shared/splash'
  import { CommonError } from '@@/infrastructure/dto/errors'
  import { useNotify } from '@@/use-cases/notifications'
  import { NotificationType } from '@@/domain/notifications'

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
    return route.meta.layout ??
      (!exists(route.meta.auth) ||
        route.meta.auth === PageAuthRequirements.Authorized)
      ? AuthorizedLayout
      : DefaultLayout
  })

  refresh()
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;800&family=Ubuntu:wght@300;400;500;700&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body,
  html,
  #app {
    @apply w-full h-full font-primary;
  }
</style>
