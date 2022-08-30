<template>
  <div class="flex flex-col items-center space-y-4 text-center">
    <img :src="foxGif404" alt="fox not found" :width="232" :height="176" />

    <BaseTypography class="text-center w-full">
      <h1>Такой страницы нет</h1>
      <p>
        Зато ты можешь найти свою вторую половинку
        <span class="whitespace-nowrap">ヽ(*・ω・)ﾉ</span>
      </p>
    </BaseTypography>

    <BaseButton tag="a" href="/">
      <template #icon>
        <SearchIcon class="w-5 h-5" />
      </template>
      Найти!
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/base-button.vue'
  import SearchIcon from '~icons/heroicons-outline/search'
  import { useHead } from '@vueuse/head'

  import foxGif404 from '@/assets/gif/fox-gif-404.gif'
  import BaseTypography from '@/components/ui/base-typography.vue'

  useHead({
    title: 'Не найдено',
  })
</script>
