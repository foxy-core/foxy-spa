import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

import { Notification } from '@@/domain/notifications'


type StoredNotification = Notification & {
  id: number
}

export const useNotificationsStore = defineStore(
  'notifications/notifications',
  () => {
    const currentId = ref(0)

    const getNewId = () => currentId.value++

    const notifications = ref<StoredNotification[]>([])

    const addNotification = (notification: Notification) => {
      const id = getNewId()
      notifications.value.push({
        ...notification,
        id,
      })

      return id
    }

    const removeNotification = (id: number) => {
      notifications.value = notifications.value.filter(v => v.id !== id)
    }

    return {
      notifications: readonly(notifications),
      addNotification,
      removeNotification,
    }
  },
)
