import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'

import {
  TimeClock,
  timeClockModel,
  TimeClockStatusEnum,
} from '~/features/time/clock'

import { oneSecondSubtracted } from '../model'

export function Time() {
  const { statusNewSet, statusInProgressSet, statusStoppedSet, useStatus } =
    timeClockModel
  const status = useStatus()

  return (
    <Stack justifyContent='center' alignItems='center'>
      <TimeClock oneSecondHandler={oneSecondSubtracted} />

      <Stack justifyContent='center' alignItems='center' direction='row'>
        {(status === TimeClockStatusEnum.InProgress ||
          status === TimeClockStatusEnum.Stopped) && (
          <IconButton onClick={() => statusNewSet()}>
            <StopCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === TimeClockStatusEnum.Stopped && (
          <IconButton onClick={() => statusInProgressSet()}>
            <PlayCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === TimeClockStatusEnum.InProgress && (
          <IconButton onClick={() => statusStoppedSet()}>
            <PauseCircleIcon fontSize='large' />
          </IconButton>
        )}
      </Stack>
    </Stack>
  )
}
