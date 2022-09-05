<template>
  <div class="w-full h-full max-w-md">
    <!-- TODO: add transition here -->
    <StepName v-if="currentStep === ProfileWizardStep.Name" />
    <StepInterests v-if="currentStep === ProfileWizardStep.Interests" />
    <StepCongratulations
      v-if="currentStep === ProfileWizardStep.Congratulations"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProfileWizardStep } from '@@/domain/profiles'
  import { useProfileWizard } from '@@/use-cases/profiles'

  import StepName from './steps/step-name.vue'
  import StepInterests from './steps/step-interests.vue'
  import StepCongratulations from './steps/step-congratulations.vue'

  const { currentStep } = useProfileWizard()
</script>
