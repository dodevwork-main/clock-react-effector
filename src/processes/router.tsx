import { createBrowserRouter, Navigate } from 'react-router-dom'

import { PathEnum } from '~/shared/config/constants'
import { LayoutMain } from '~/widgets/layout/main'
import { LayoutMinimal } from '~/widgets/layout/minimal'
import { NotFoundPage } from '~/shared/ui/NotFoundPage'
import { AlarmPage, StopwatchPage, TimerPage, TimeZonePage } from '~/pages'

export const router = createBrowserRouter([
  {
    element: <LayoutMain />,
    children: [
      { path: PathEnum.Alarm, element: <AlarmPage /> },
      { path: PathEnum.TimeZone, element: <TimeZonePage /> },
      { path: PathEnum.Stopwatch, element: <StopwatchPage /> },
      { path: PathEnum.Timer, element: <TimerPage /> },
    ],
  },
  {
    element: <LayoutMinimal />,
    children: [
      { path: '/', element: <Navigate to={PathEnum.Alarm} /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
