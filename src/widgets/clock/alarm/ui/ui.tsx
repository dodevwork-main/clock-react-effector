import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useGate } from 'effector-react'
import List from '@mui/material/List'
import { styled } from '@mui/material'
import ListItem from '@mui/material/ListItem'

import { getUnixFromNow } from '~/shared/lib/getUnixFromNow'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'

import { Gate, useAlarmEvent, useAlarms, useModal } from '../model'

import { Item } from './Item'
import { Set } from './Set'

const StyledList = styled(List)({
  flex: 1,
  width: '100%',
  minHeight: 0,
  marginTop: 2,
  overflowY: 'auto',
})

export function Alarm() {
  useGate(Gate)
  const alarms = useAlarms()
  const { alarmDone } = useAlarmEvent()
  const [, , openModal] = useModal()

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
          const timeout = window.setTimeout(
            () => alarmDone(alarm),
            unixFromNow * 1000,
          )

          timeouts.push(timeout)
        }
      }
    })

    return () => timeouts.forEach((timeout) => clearTimeout(timeout))
  }, [alarms, alarmDone])

  return (
    <Stack flex={1} minHeight={0}>
      {alarms.length > 0 ? (
        <StyledList>
          {alarms.map((alarm) => (
            <ListItem key={alarm.time.unix()}>
              <Item alarm={alarm} />
            </ListItem>
          ))}
        </StyledList>
      ) : (
        <Stack flex={1} justifyContent='center' alignItems='center'>
          <Typography variant='h3' mb={5}>
            Add Alarm
          </Typography>

          <ArrowDownwardIcon fontSize='large' />
        </Stack>
      )}

      <Stack justifyContent='center' alignItems='center'>
        <IconButton onClick={() => openModal()}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Stack>

      <Set />
    </Stack>
  )
}
