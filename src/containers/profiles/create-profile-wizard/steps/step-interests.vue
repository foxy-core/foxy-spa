<template>
  <div class="w-full">
    <BaseTypography class="w-full mx-auto text-center">
      <h1>Теперь об интересах</h1>

      <p>Выбери свои увлечения</p>
    </BaseTypography>

    <BaseMultpicker v-bind="interests" :options="interestsOptions" />

    <BaseButton
      class="w-full mt-5 sticky bottom-[calc(env(safe-area-inset-bottom)+5rem)] left-0"
      @click="submitForm"
    >
      Далее
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { useProfileWizard } from '@@/use-cases/profiles'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseMultpicker from '@/components/ui/base-multpicker.vue'
  import BaseButton from '@/components/ui/base-button.vue'

  const {
    interestsOptions,
    stepInterestsForm: {
      bindings: { interests },
      submitForm,
    },
  } = useProfileWizard()
</script>
