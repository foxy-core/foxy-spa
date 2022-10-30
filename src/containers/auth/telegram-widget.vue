<template>
  <BaseButton
    tag="div"
    role="button"
    custom
    outline
    class="text-[#0088CC] border-[#0088CC] hover:media-hover:text-[#0077AA] hover:media-hover:border-[#0077AA]"
    @click="clicked"
  >
    <template #icon>
      <TelegramIcon class="w-6 h-6" />
    </template>
    Войти с Telegram
  </BaseButton>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, onMounted } from 'vue'


  import BaseButton from '@/components/ui/base-button.vue'
  import { TG_CONFIG } from '@@/shared/environment'
  import {
    openTelegramPopup,
    createTelegramOauthListener,
  } from '@@/shared/telegram'
  import { useAuthViaTg } from '@@/use-cases/auth'

  import TelegramIcon from '~icons/mdi/telegram'

  const authViaTg = useAuthViaTg()

  const origin = window.origin
  const botId = TG_CONFIG.botId

  const clicked = () => {
    openTelegramPopup(botId, origin)
  }

  let unlisten: CallableFunction

  onMounted(() => {
    unlisten = createTelegramOauthListener(authViaTg)
  })

  onBeforeUnmount(() => {
    unlisten?.()
  })
</script>
