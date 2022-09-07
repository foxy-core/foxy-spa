<template>
  <Story title="BaseInputNumber">
    <BaseInputNumber v-model="model" v-bind="binding" />
  </Story>
</template>

<script setup lang="ts">
  import BaseInputNumber from '@/components/ui/base-input-number.vue'
  import { computed } from '@vue/reactivity'
  import { reactive, ref } from 'vue'

  const model = ref()

  const binding = reactive({
    label: 'Вес твоей мамки (кг)',
    errorString: computed(() =>
      model.value >= 1000
        ? 'Не, ну это даже для твоей мамки чересчур'
        : undefined,
    ),
    requirementNotSatisfied: false,
  })
</script>
