<template>
  <form
    class="max-w-lg flex flex-col space-y-3 w-full"
    @submit.prevent="submitForm"
  >
    <BaseTypography class="text-center">
      <h1>Регистрация</h1>
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
      autocomplete="new-password"
      v-bind="inputs.password.value"
    />
    <BaseInput
      label="Подтвердите пароль"
      type="password"
      autocomplete="new-password"
      v-bind="inputs.confirmPassword.value"
    />

    <BaseButton :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Зарегистрироваться
    </BaseButton>

    <RouterLink
      custom
      :to="{ name: AuthPage.SignIn }"
      v-slot="{ href, navigate }"
    >
      <BaseButton tag="a" outline :href="href" @click="navigate">
        Я уже зарегистрирован
      </BaseButton>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
  import {
    confirmPasswordValidator,
    emailValidator,
    passwordValidator,
  } from '@@/domain/accounts'
  import { useSignUp } from '@@/use-cases/auth'
  import { useForm } from '@@/shared/forms'
  import BaseInput from '@/components/ui/base-input.vue'
  import BaseButton from '@/components/ui/base-button.vue'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import { AuthPage } from '@@/domain/auth'

  const signUp = useSignUp()

  const { inputs, submitForm, isLoading } = useForm<{
    email: string
    password: string
    confirmPassword: string
  }>({
    fields: {
      email: {
        validator: emailValidator,
      },
      password: {
        validator: passwordValidator,
      },
      confirmPassword: {
        validator: confirmPasswordValidator,
      },
    },
    onSubmitted: async state => {
      await signUp(state)
    },
  })
</script>
