import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useGate } from 'effector-react'

import { getUnixFromNow } from '~/shared/lib/getUnixFromNow'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'

import { alarmDone, Gate, modalOpened, useAlarms } from '../model'

import { Item } from './Item'
import { Set } from './Set'

export function Alarm() {
  useGate(Gate)
  const alarms = useAlarms()

  useEffect(() => {
    const timeouts: number[] = []

    alarms.forEach((alarm) => {
      if (alarm.isOn) {
        let timeFromToday = getTimeFromToday(alarm.time)

        if (timeFromToday.isSameOrBefore(dayjs())) {
          timeFromToday = timeFromToday.add(1, 'day')
        }

        const unixFromNow = getUnixFromNow(timeFromToday)

        if (unixFromNow > 0) {
          const timeout = setTimeout(() => alarmDone(alarm), unixFromNow * 1000)

          timeouts.push(timeout)
        }
      }
    })

    return () => timeouts.forEach((timeout) => clearTimeout(timeout))
  }, [alarms])

  return (
    <Stack flex={1} minHeight={0}>
      {alarms.length > 0 ? (
        <Stack
          flex={1}
          minHeight={0}
          spacing={2}
          mt={2}
          sx={{ overflowY: 'auto' }}
        >
          {alarms.map((alarm) => (
            <Item key={alarm.time.unix()} alarm={alarm} />
          ))}
        </Stack>
      ) : (
        <Stack flex={1} justifyContent='center' alignItems='center'>
          <Typography variant='h3' mb={5}>
            Add Alarm
          </Typography>

          <ArrowDownwardIcon fontSize='large' />
        </Stack>
      )}

      <Stack justifyContent='center' alignItems='center'>
        <IconButton onClick={() => modalOpened()}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Stack>

      <Set />
    </Stack>
  )
}
