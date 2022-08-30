<template>
  <div class="flex flex-col items-center space-y-3">
    <BaseButton outline variant="secondary" @click="signOut">Выйти</BaseButton>

    <BaseButton outline @click="theme.toggleCurrentTheme">{{
      theme.currentTheme === Theme.Dark ? 'Светлая тема' : 'Темная тема'
    }}</BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import BaseButton from '@/components/ui/base-button.vue'
  import { signOut } from '@@/use-cases/auth'
  import { useTheme } from '@@/use-cases/layout'
  import { Theme } from '@@/domain/layout'

  useHead({
    title: 'Аккаунт',
  })

  const theme = useTheme()
</script>
