import { Dayjs } from 'dayjs'
import { Event } from 'effector'
import { useEffect } from 'react'
import Typography from '@mui/material/Typography'

import { ClockStatusEnum, TIME_FORMAT_CLOCK } from '~/shared/config/constants'

type Props = {
  status: ClockStatusEnum
  time: Dayjs
  oneSecondHandler: Event<void>
}

export function Clock({ status, time, oneSecondHandler }: Props) {
  useEffect(() => {
    if (status === ClockStatusEnum.InProgress) {
      const interval = setInterval(() => {
        oneSecondHandler()
      }, 100)

      return () => clearInterval(interval)
    }
  }, [status, oneSecondHandler])

  return <Typography variant='h1'>{time.format(TIME_FORMAT_CLOCK)}</Typography>
}
