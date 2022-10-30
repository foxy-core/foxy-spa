<template>
  <div class="w-full h-full max-w-md">
    <!-- TODO: add transition here -->
    <StepNameAge v-if="currentStep === ProfileWizardStep.NameAge" />
    <StepSmokingDrinking
      v-else-if="currentStep === ProfileWizardStep.SmokingDrinking"
    />
    <StepInterests v-else-if="currentStep === ProfileWizardStep.Interests" />
    <StepCongratulations
      v-else-if="currentStep === ProfileWizardStep.Congratulations"
    />
    <StepPersonality
      v-else-if="currentStep === ProfileWizardStep.Personality"
    />
  </div>
</template>

<script setup lang="ts">
  import { ProfileWizardStep } from '@@/domain/profiles'
  import { useProfileWizard } from '@@/use-cases/profiles'

  import StepCongratulations from './steps/step-congratulations.vue'
  import StepInterests from './steps/step-interests.vue'
  import StepNameAge from './steps/step-name-age.vue'
  import StepPersonality from './steps/step-personality.vue'
  import StepSmokingDrinking from './steps/step-smoking-drinking.vue'

  const { currentStep } = useProfileWizard()
</script>
