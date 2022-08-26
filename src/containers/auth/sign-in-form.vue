<template>
  <form
    class="max-w-lg flex flex-col space-y-3 w-full"
    @submit.prevent="submitForm"
  >
    <BaseTypography class="text-center">
      <h1>Вход</h1>
    </BaseTypography>

    <BaseInput
      label="E-mail"
      type="email"
      autocomplete="e-mail"
      v-bind="inputs.email.value"
    />
    <BaseInput
      label="Пароль"
      type="password"
      autocomplete="current-password"
      v-bind="inputs.password.value"
    />

    <BaseButton variant="warning" :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Войти
    </BaseButton>

    <RouterLink
      custom
      :to="{ name: AuthPage.SignUp }"
      v-slot="{ href, navigate }"
    >
      <BaseButton
        tag="a"
        outline
        variant="warning"
        :href="href"
        @click="navigate"
      >
        У меня нет аккаунта
      </BaseButton>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'

  import { emailValidator, passwordValidator } from '@@/domain/accounts'
  import { useForm } from '@@/shared/forms'
  import { AuthPage } from '@@/domain/auth'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseInput from '@/components/ui/base-input.vue'
  import BaseButton from '@/components/ui/base-button.vue'
  import { useSignIn } from '@@/use-cases/auth'

  const signIn = useSignIn()

  const { inputs, submitForm, isLoading } = useForm<{
    email: string
    password: string
  }>({
    fields: {
      email: {
        validator: emailValidator,
      },
      password: {
        validator: passwordValidator,
      },
    },
    onSubmitted: async state => {
      await signIn(state)
    },
  })
</script>
