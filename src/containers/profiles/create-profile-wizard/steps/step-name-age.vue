<template>
  <form
    class="w-full h-full flex flex-col space-y-4"
    @submit.prevent="submitForm"
  >
    <BaseTypography class="text-center mx-auto">
      <h1>Привет</h1>

      <h2>Давай знакомиться поближе</h2>
    </BaseTypography>

    <BaseInput label="Имя" v-bind="name" />

    <BaseInputNumber label="Возраст" v-bind="age" />

    <BaseButton>Далее</BaseButton>
  </form>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/ui/base-input.vue'
  import { useProfileWizard } from '@@/use-cases/profiles'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseButton from '@/components/ui/base-button.vue'
  import BaseInputNumber from '@/components/ui/base-input-number.vue'

  const {
    stepNameForm: {
      bindings: { name, age },
      submitForm,
    },
  } = useProfileWizard()
</script>
