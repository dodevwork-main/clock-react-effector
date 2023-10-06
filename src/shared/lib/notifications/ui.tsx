import { SnackbarKey, useSnackbar } from 'notistack'
import { ReactNode } from 'react'
import { useUpdateEffect } from 'react-use'

import { useNotifications, useNotificationsEvent } from './model'

let displayed: SnackbarKey[] = []

type Props = { children: ReactNode }

export function Provider({ children }: Props) {
  const notifications = useNotifications()
  const { snackbarRemoved } = useNotificationsEvent()

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (key: SnackbarKey) => {
    displayed = [...displayed, key]
  }

  const removeDisplayed = (key: SnackbarKey) => {
    displayed = [...displayed.filter((dkey) => key !== dkey)]
  }

  useUpdateEffect(() => {
    notifications.forEach(({ key, message, dismissed = false, ...options }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key)
        return
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onExited: (_, myKey) => {
          // remove this snackbar from store
          snackbarRemoved(myKey)
          removeDisplayed(myKey)
        },
      })

      // keep track of snackbars that we've displayed
      storeDisplayed(key)
    })
  }, [notifications])

  return <>{children}</>
}
