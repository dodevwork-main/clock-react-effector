import { createDomain } from 'effector'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'
import { useUnit } from 'effector-react'

const domain = createDomain('notifications')

export type EnqueueParams = {
  message: SnackbarMessage
} & OptionsObject

export const snackbarEnqueued = domain.createEvent<EnqueueParams>()
export const snackbarRemoved = domain.createEvent<SnackbarKey>()

type Snackbar = {
  key: SnackbarKey
  message: SnackbarMessage
  dismissed?: boolean
} & Omit<OptionsObject, 'key'>

export const $notifications = domain
  .createStore<Snackbar[]>([])
  .on(snackbarEnqueued, (state, payload) => [
    ...state,
    {
      key: payload.key || new Date().getTime() + Math.random(),
      ...payload,
      dismissed: false,
    },
  ])
  .on(snackbarRemoved, (state, payload) =>
    state.filter(({ key }) => key !== payload),
  )

export const useNotifications = () => useUnit($notifications)
export const useNotificationsEvent = () =>
  useUnit({ snackbarEnqueued, snackbarRemoved })
