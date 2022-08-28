<template>
  <form
    class="max-w-lg flex flex-col space-y-3 w-full min-h-full"
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

    <BaseButton
      custom
      class="bg-[#0077FF] hover:media-hover:bg-[#0066EE] text-white !mt-auto lg:!mt-3"
      tag="a"
      :href="VK_OAUTH_LINK"
    >
      <template #icon>
        <IonLogoVk class="w-5 h-5" />
      </template>
      Войти через VK
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
  import LoginIcon from '~icons/heroicons-outline/login'
  import IonLogoVk from '~icons/ion/logo-vk'

  import { emailValidator, passwordValidator } from '@@/domain/accounts'
  import { useForm } from '@@/shared/forms'
  import { AuthPage } from '@@/domain/auth'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import BaseInput from '@/components/ui/base-input.vue'
  import BaseButton from '@/components/ui/base-button.vue'
  import { useSignIn } from '@@/use-cases/auth'

  const VK_OAUTH_LINK =
    'https://oauth.vk.com/authorize?client_id=51403577&display=popup&redirect_uri=https://foxy.talkiiing.ru/internal/redirect/vk&scope=email&response_type=code&v=5.131'

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
