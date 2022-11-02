<template>
  <form class="w-full h-full flex flex-col space-y-4">
    <BaseTypography class="text-center mx-auto">
      <h1>Как насчет твоего типа личности?</h1>
    </BaseTypography>

    <BasePicker v-bind="personality" :options="personalityOptions" />

    <BaseButton
      class="w-full mt-5 sticky bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-0"
      @click="submitForm"
    >
      Далее
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/base-button.vue'
  import BasePicker from '@/components/ui/base-picker.vue'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import { useProfileWizard } from '@@/use-cases/profiles'

  const {
    stepPersonalityForm: {
      bindings: { personality },
      submitForm,
    },
    personalityOptions,
  } = useProfileWizard()
</script>
