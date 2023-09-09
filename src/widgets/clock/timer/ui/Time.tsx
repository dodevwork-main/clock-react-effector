import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'

import { Clock } from '~/shared/ui/Clock'
import { ClockStatusEnum } from '~/shared/config/constants'

import {
  oneSecondSubtracted,
  statusInProgressSet,
  statusNewSet,
  statusStoppedSet,
  useStatus,
  useTime,
} from '../model'

export function Time() {
  const status = useStatus()
  const time = useTime()

  return (
    <Stack justifyContent='center' alignItems='center'>
      <Clock
        status={status}
        time={time}
        oneSecondHandler={oneSecondSubtracted}
      />

      <Stack justifyContent='center' alignItems='center' direction='row'>
        {(status === ClockStatusEnum.InProgress ||
          status === ClockStatusEnum.Stopped) && (
          <IconButton onClick={() => statusNewSet()}>
            <StopCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === ClockStatusEnum.Stopped && (
          <IconButton onClick={() => statusInProgressSet()}>
            <PlayCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === ClockStatusEnum.InProgress && (
          <IconButton onClick={() => statusStoppedSet()}>
            <PauseCircleIcon fontSize='large' />
          </IconButton>
        )}
      </Stack>
    </Stack>
  )
}
