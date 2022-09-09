<template>
  <div class="w-full h-full flex flex-col space-y-4">
    <BaseTypography class="text-center mx-auto">
      <h1>Твое отношение к&nbsp;вредным привычкам</h1>
    </BaseTypography>

    <TwemojiCigarette class="inline mx-auto w-10 h-10" />
    <BaseTypography class="text-center mx-auto">
      <h2>Курение</h2>
    </BaseTypography>
    <BasePicker v-bind="smoking" :options="frequencyOptions" />

    <TwemojiWineGlass class="inline mx-auto w-10 h-10" />
    <BaseTypography class="text-center mx-auto">
      <h2>Алкоголь</h2>
    </BaseTypography>
    <BasePicker v-bind="alcohol" :options="frequencyOptions" />

    <BaseButton
      class="w-full mt-5 sticky bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-0"
      @click="submitForm"
      >Далее</BaseButton
    >
  </div>
</template>

<script setup lang="ts">
  import { useProfileWizard } from '@@/use-cases/profiles'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseButton from '@/components/ui/base-button.vue'
  import BasePicker from '@/components/ui/base-picker.vue'
  import TwemojiWineGlass from '~icons/twemoji/wine-glass'
  import TwemojiCigarette from '~icons/twemoji/cigarette'

  const {
    stepSmokingDrinkingForm: {
      bindings: { alcohol, smoking },
      submitForm,
    },
    frequencyOptions,
  } = useProfileWizard()
</script>
