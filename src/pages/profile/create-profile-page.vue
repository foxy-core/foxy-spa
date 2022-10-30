<template>
  <CreateProfileWizard />
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'

  import CreateProfileWizard from '@/containers/profiles/create-profile-wizard/create-profile-wizard.vue'

  useHead({
    title: 'Создание профиля',
  })
</script>
