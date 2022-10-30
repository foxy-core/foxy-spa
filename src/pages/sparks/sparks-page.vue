<template>
  <div>
    <BaseMultipicker v-model="state" :options="options" />
  </div>
</template>

<script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { ref } from 'vue'

  import BaseMultipicker from '@/components/ui/base-multpicker.vue'

  const state = ref<string[]>([])

  const options = [
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba',
      },
    ],
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism1',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle1',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni1',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard1',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba1',
      },
    ].reverse(),
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism2',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle2',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni2',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard2',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba2',
      },
    ],
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism3',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle3',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni3',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard3',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba3',
      },
    ].reverse(),
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism4',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle4',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni4',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard4',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba4',
      },
    ],
    [
      {
        displayValue: 'Пеший туризм',
        key: 'turism5',
      },
      {
        displayValue: 'Велосипед',
        key: 'bicycle5',
      },
      {
        displayValue: 'Конный спорт',
        key: 'koni5',
      },
      {
        displayValue: 'Сноуборд',
        key: 'snowboard5',
      },
      {
        displayValue: 'Абоба',
        key: 'aboba5',
      },
    ].reverse(),
  ]

  useHead({
    title: 'Искры',
  })
</script>
