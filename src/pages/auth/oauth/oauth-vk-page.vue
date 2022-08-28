<template>
  <div class="w-full">
    <BaseTypography class="text-center">
      <img
        class="mx-auto"
        width="128"
        height="128"
        src="@/assets/png/vk-fox-128.png"
      />
      <h1>Ожидайте</h1>
      <p class="animate-pulse">Авторизуем вас через VK...</p>
    </BaseTypography>
  </div>
</template>

<script setup lang="ts">
  import { useAuthViaVk } from '@@/use-cases/auth'
  import BaseTypography from '@/components/ui/base-typography.vue'

  const authViaVk = useAuthViaVk()

  authViaVk()
</script>
