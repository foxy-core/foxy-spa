<template>
  <div class="w-full h-full max-w-md">
    <!-- TODO: add transition here -->
    <StepNameAge v-if="currentStep === ProfileWizardStep.NameAge" />
    <StepSmokingDrinking
      v-if="currentStep === ProfileWizardStep.SmokingDrinking"
    />
    <StepInterests v-if="currentStep === ProfileWizardStep.Interests" />
    <StepCongratulations
      v-if="currentStep === ProfileWizardStep.Congratulations"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProfileWizardStep } from '@@/domain/profiles'
  import { useProfileWizard } from '@@/use-cases/profiles'

  import StepNameAge from './steps/step-name-age.vue'
  import StepInterests from './steps/step-interests.vue'
  import StepCongratulations from './steps/step-congratulations.vue'
  import StepSmokingDrinking from './steps/step-smoking-drinking.vue'

  const { currentStep } = useProfileWizard()
</script>
