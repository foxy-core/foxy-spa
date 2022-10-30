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
      v-bind="email"
    />
    <BaseInput
      label="Пароль"
      type="password"
      autocomplete="new-password"
      v-bind="password"
    />
    <BaseInput
      label="Подтвердите пароль"
      type="password"
      autocomplete="new-password"
      v-bind="confirmPassword"
    />

    <BaseButton :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Зарегистрироваться
    </BaseButton>

    <RouterLink
      v-slot="{ href, navigate }"
      custom
      :to="{ name: AuthPage.SignIn }"
    >
      <BaseButton tag="a" outline :href="href" @click="navigate">
        Я уже зарегистрирован
      </BaseButton>
    </RouterLink>
  </form>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/base-button.vue'
  import BaseInput from '@/components/ui/base-input.vue'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import {
    confirmPasswordValidator,
    emailValidator,
    passwordValidator,
  } from '@@/domain/accounts'
  import { AuthPage } from '@@/domain/auth'
  import { FormFieldType, useForm } from '@@/shared/forms'
  import { useSignUp } from '@@/use-cases/auth'

  import LoginIcon from '~icons/heroicons-outline/login'

  const signUp = useSignUp()

  const {
    bindings: { email, password, confirmPassword },
    submitForm,
    isLoading,
  } = useForm({
    fields: {
      email: {
        validator: emailValidator,
        type: FormFieldType.Input,
      },
      password: {
        validator: passwordValidator,
        type: FormFieldType.Input,
      },
      confirmPassword: {
        validator: confirmPasswordValidator,
        type: FormFieldType.Input,
      },
    },
    onSubmitted: async state => {
      await signUp(state)
    },
  })
</script>
