<template>
  <div class="flex flex-col items-center space-y-3 w-full">
    <BaseButton outline variant="secondary" @click="signOut">Выйти</BaseButton>

    <BaseButton outline @click="theme.toggleCurrentTheme">
      {{ theme.currentTheme === Theme.Dark ? 'Светлая тема' : 'Темная тема' }}
    </BaseButton>

    <RouterLink
      v-slot="{ navigate, href }"
      :to="{ name: ProfilesPage.CreateProfile }"
      custom
    >
      <BaseButton tag="a" :href="href" @click="navigate">
        Создать профиль
      </BaseButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'

  import BaseButton from '@/components/ui/base-button.vue'
  import { Theme } from '@@/domain/layout'
  import { ProfilesPage } from '@@/domain/profiles'
  import { signOut } from '@@/use-cases/auth'
  import { useTheme } from '@@/use-cases/layout'

  useHead({
    title: 'Аккаунт',
  })

  const theme = useTheme()
</script>
