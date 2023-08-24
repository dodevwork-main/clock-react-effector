import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { SnackbarProvider } from 'notistack'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { theme } from '~/shared/config/theme'
import { router } from '~/processes/router'
import { NotificationsProvider } from '~/shared/lib/notifications'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

export function App() {
  return (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <NotificationsProvider>
              <RouterProvider router={router} />
            </NotificationsProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </HelmetProvider>
  )
}
