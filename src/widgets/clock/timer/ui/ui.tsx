import Stack from '@mui/material/Stack'

import { ClockStatusEnum } from '~/shared/config/constants'

import { useStatus } from '../model'

import { Time } from './Time'
import { Set } from './Set'

export function Timer() {
  const status = useStatus()

  return (
    <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
      {status === ClockStatusEnum.New ? <Set /> : <Time />}
    </Stack>
  )
}
