import {
  $notifications,
  allSnackbarsClosed,
  snackbarClosed,
  snackbarEnqueued,
  snackbarEnqueuedList,
  snackbarRemoved,
  useNotifications,
} from './model'

export const notificationsModel = {
  $notifications,
  allSnackbarsClosed,
  snackbarClosed,
  snackbarEnqueued,
  snackbarEnqueuedList,
  snackbarRemoved,
  useNotifications,
}
export { Provider as NotificationsProvider } from './ui'
