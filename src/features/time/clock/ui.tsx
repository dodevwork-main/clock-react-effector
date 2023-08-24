import { useGate } from 'effector-react'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { Event } from 'effector'

import { TIME_FORMAT_CLOCK } from '~/shared/config/constants'

import { StatusEnum } from './constants'
import { Gate, useStatus, useTime } from './model'

type Props = {
  oneSecondHandler: Event<void>
}

export function Clock({ oneSecondHandler }: Props) {
  useGate(Gate)
  const status = useStatus()
  const time = useTime()

  useEffect(() => {
    if (status === StatusEnum.InProgress) {
      const interval = setInterval(() => {
        oneSecondHandler()
      }, 100)

      return () => clearInterval(interval)
    }
  }, [status, oneSecondHandler])

  return <Typography variant='h1'>{time.format(TIME_FORMAT_CLOCK)}</Typography>
}
