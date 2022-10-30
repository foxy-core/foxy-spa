<template>
  <form
    class="flex max-w-lg flex-col space-y-3 w-full justify-self-end min-h-full"
    @submit.prevent="submitForm"
  >
    <BaseTypography class="text-center">
      <h1>Вход</h1>
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
      autocomplete="current-password"
      v-bind="password"
    />

    <BaseButton :is-loading="isLoading">
      <template #icon><LoginIcon class="w-5 h-5" /></template>
      Войти
    </BaseButton>

    <RouterLink
      v-slot="{ href, navigate }"
      custom
      :to="{ name: AuthPage.SignUp }"
    >
      <BaseButton tag="a" outline :href="href" @click="navigate">
        У меня нет аккаунта
      </BaseButton>
    </RouterLink>

    <div class="space-y-3 !mt-auto lg:!mt-0">
      <hr class="w-1/2 mx-auto my-5" />

      <div
        class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3"
      >
        <BaseButton
          custom
          outline
          class="text-[#0077FF] border-[#0066EE] hover:media-hover:text-[#0066EE] hover:media-hover:border-[#0066EE] w-full"
          tag="a"
          :href="VK_OAUTH_LINK"
        >
          <template #icon>
            <IonLogoVk class="w-5 h-5" />
          </template>
          Войти с VK
        </BaseButton>

        <TelegramWidget class="w-full" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/ui/base-button.vue'
  import BaseInput from '@/components/ui/base-input.vue'
  import BaseTypography from '@/components/ui/base-typography.vue'
  import TelegramWidget from '@/containers/auth/telegram-widget.vue'
  import { emailValidator, passwordValidator } from '@@/domain/accounts'
  import { AuthPage } from '@@/domain/auth'
  import { FormFieldType, useForm } from '@@/shared/forms'
  import { useSignIn } from '@@/use-cases/auth'

  import LoginIcon from '~icons/heroicons-outline/login'
  import IonLogoVk from '~icons/ion/logo-vk'


  const VK_OAUTH_LINK =
    'https://oauth.vk.com/authorize?client_id=51403577&display=popup&redirect_uri=https://foxy.talkiiing.ru/internal/redirect/vk&scope=email&response_type=code&v=5.131'

  const signIn = useSignIn()

  const {
    bindings: { email, password },
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
    },
    onSubmitted: async state => {
      await signIn(state)
    },
  })
</script>
