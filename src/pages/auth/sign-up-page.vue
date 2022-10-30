<template>
  <SignUpForm />
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'

  import SignUpForm from '@/containers/auth/sign-up-form.vue'

  useHead({
    title: 'Регистрация',
  })
</script>
