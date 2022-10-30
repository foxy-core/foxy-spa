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
      v-slot="{ href, navigate }"
      :to="{ name: CardsPage.Cards }"
      custom
    >
      <BaseButton tag="a" :href="href" class="mx-auto" @click="navigate"
        >На главную</BaseButton
      >
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/base-button.vue'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import { CardsPage } from '@@/domain/cards'
</script>
