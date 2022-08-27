import {
  DEFAULT_NOTIFICATION_DURATION,
  Notification,
  NotificationType,
} from '@@/domain/notifications'
import { useNotificationsStore } from '@@/stores/notifications'

export const useNotify = () => {
  const store = useNotificationsStore()

  return (notification: Partial<Notification> & Pick<Notification, 'text'>) => {
    const mapped: Notification = {
      text: notification.text,
      duration: notification.duration ?? DEFAULT_NOTIFICATION_DURATION,
      type: notification.type ?? NotificationType.Info,
    }

    const id = store.addNotification(mapped)

    setTimeout(() => {
      store.removeNotification(id)
    }, mapped.duration)
  }
}
