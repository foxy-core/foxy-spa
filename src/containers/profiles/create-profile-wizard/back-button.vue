<template>
  <CustomTransition type="bottom">
    <BaseButton
      v-if="isShowBackButton"
      semitransparent
      custom
      class="!px-0 text-surface-500 text-sm"
      @click="goBack"
    >
      <template #icon>
        <LeftIcon class="w-5 h-5 text-surface-500" />
      </template>
      Назад
    </BaseButton>
  </CustomTransition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  import LeftIcon from '~icons/heroicons-outline/chevron-left'

  import BaseButton from '@/components/ui/base-button.vue'
  import CustomTransition from '@/components/ui/custom-transition.vue'

  import { ProfileWizardStep } from '@@/domain/profiles'
  import { useProfileWizard } from '@@/use-cases/profiles'

  const profileWizard = useProfileWizard()

  const goBack = () => profileWizard.previousStep()

  const isShowBackButton = computed(
    () =>
      profileWizard.currentStep.value > ProfileWizardStep.Name &&
      profileWizard.currentStep.value < ProfileWizardStep.Congratulations,
  )
</script>
