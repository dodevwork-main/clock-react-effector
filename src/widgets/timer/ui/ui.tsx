import Stack from '@mui/material/Stack'

import { timeClockModel, TimeClockStatusEnum } from '~/features/time/clock'

import { Time } from './Time'
import { Set } from './Set'

export function Timer() {
  const status = timeClockModel.useStatus()

  return (
    <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
      {status === TimeClockStatusEnum.New ? <Set /> : <Time />}
    </Stack>
  )
}
