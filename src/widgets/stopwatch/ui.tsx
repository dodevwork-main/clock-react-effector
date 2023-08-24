import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'

import {
  TimeClock,
  timeClockModel,
  TimeClockStatusEnum,
} from '~/features/time/clock'

import { oneSecondAdded } from './model'

export function Stopwatch() {
  const { statusNewSet, statusInProgressSet, statusStoppedSet, useStatus } =
    timeClockModel
  const status = useStatus()

  return (
    <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
      <Stack justifyContent='center' alignItems='center'>
        <TimeClock oneSecondHandler={oneSecondAdded} />

        <Stack justifyContent='center' alignItems='center' direction='row'>
          {(status === TimeClockStatusEnum.InProgress ||
            status === TimeClockStatusEnum.Stopped) && (
            <IconButton onClick={() => statusNewSet()}>
              <StopCircleIcon fontSize='large' />
            </IconButton>
          )}

          {(status === TimeClockStatusEnum.New ||
            status === TimeClockStatusEnum.Stopped) && (
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
    </Stack>
  )
}
