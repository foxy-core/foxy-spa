<template>
  <SignInForm />
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import SignInForm from '@/containers/auth/sign-in-form.vue'

  useHead({
    title: 'Вход',
  })
</script>
