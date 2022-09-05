<template>
  <div class="w-full">
    <BaseTypography class="w-full text-center">
      <h1>Конгратулатионс!</h1>

      <p>
        Вы прошли это и теперь у вас есть
        <span class="text-primary">профиль</span>!
      </p>

      <small>To be continued...</small>
    </BaseTypography>

    <RouterLink
      :to="{ name: CardsPage.Cards }"
      custom
      v-slot="{ href, navigate }"
    >
      <BaseButton tag="a" :href="href" @click="navigate" class="mx-auto"
        >На главную</BaseButton
      >
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import { CardsPage } from '@@/domain/cards'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseButton from '@/components/ui/base-button.vue'
</script>
