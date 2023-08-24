import { createDomain } from 'effector'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack'
import { useUnit } from 'effector-react'

const domain = createDomain('notifications')

export type EnqueueParams = {
  message: SnackbarMessage
} & OptionsObject

export const snackbarEnqueued = domain.createEvent<EnqueueParams>()
export const snackbarEnqueuedList = domain.createEvent<EnqueueParams[]>()
export const snackbarClosed = domain.createEvent<SnackbarKey>()
export const allSnackbarsClosed = domain.createEvent()
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
  .on(snackbarEnqueuedList, (state, payload) => [
    ...state,
    ...payload.map((notification) => ({
      key: notification.key || new Date().getTime() + Math.random(),
      ...notification,
      dismissed: false,
    })),
  ])
  .on(snackbarClosed, (state, payload) =>
    state.map((snackbar) =>
      snackbar.key === payload ? { ...snackbar, dismissed: true } : snackbar,
    ),
  )
  .on(allSnackbarsClosed, (state) =>
    state.map((snackbar) => ({ ...snackbar, dismissed: true })),
  )
  .on(snackbarRemoved, (state, payload) =>
    state.filter(({ key }) => key !== payload),
  )

export const useNotifications = () => useUnit($notifications)
