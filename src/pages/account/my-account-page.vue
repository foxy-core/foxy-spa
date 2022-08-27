<template>
  <BaseButton outline variant="secondary" @click="signOut">Выйти</BaseButton>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import BaseButton from '@/components/ui/base-button.vue'
  import { signOut } from '@@/use-cases/auth'

  useHead({
    title: 'Аккаунт',
  })
</script>
