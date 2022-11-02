<template>
  <Story title="BaseNotification">
    <Variant title="info">
      <BaseNotification v-bind="notificationState" type="info" />
    </Variant>
    <Variant title="success">
      <BaseNotification v-bind="notificationState" type="success" />
    </Variant>
    <Variant title="warning">
      <BaseNotification v-bind="notificationState" type="warning" />
    </Variant>
    <Variant title="error">
      <BaseNotification v-bind="notificationState" type="error" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  import BaseNotification from '@/components/ui/base-notification.vue'

  const notificationState = reactive({
    text: 'Около 3-х лет восновном делал простые веб-приложения и ботов для Telegram. Писал я на Java, также изучил такой фреймворк как Spring',
    duration: 5000,
  })
</script>
