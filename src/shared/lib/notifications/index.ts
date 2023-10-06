import {
  $notifications,
  snackbarEnqueued,
  snackbarRemoved,
  useNotifications,
  useNotificationsEvent,
} from './model'

export const notificationsModel = {
  $notifications,
  snackbarEnqueued,
  snackbarRemoved,
  useNotifications,
  useNotificationsEvent,
}
export { Provider as NotificationsProvider } from './ui'
