import { ReactElement } from 'react'
import { Scope } from 'effector'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'effector-react'
import { render, RenderOptions } from '@testing-library/react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

type RenderWithEffectorOptions = Omit<RenderOptions, 'queries'> & {
  scope: Scope
}

export function renderWithEffector(
  Component: ReactElement,
  options: RenderWithEffectorOptions,
) {
  return render(Component, {
    ...options,
    wrapper: (props) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Provider value={options.scope}>{props.children}</Provider>
        </BrowserRouter>
      </LocalizationProvider>
    ),
  })
}
