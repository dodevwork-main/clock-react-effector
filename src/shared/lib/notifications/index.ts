import {
  $notifications,
  allSnackbarsClosed,
  snackbarClosed,
  snackbarEnqueued,
  snackbarsEnqueued,
  snackbarRemoved,
  useNotifications,
} from './model'

export const notificationsModel = {
  $notifications,
  allSnackbarsClosed,
  snackbarClosed,
  snackbarEnqueued,
  snackbarsEnqueued,
  snackbarRemoved,
  useNotifications,
}
export { Provider as NotificationsProvider } from './ui'
