import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMount } from 'react-use'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material'

import { TimeZones, timeZonesModel } from '~/features/time/zones'

import { useTimeZones } from '../model'

import { LocalTime } from './LocalTime'
import { Item } from './Item'

const StyledList = styled(List)({
  flex: 2,
  width: '100%',
  overflowY: 'auto',
})

export function TimeZone() {
  const timeZones = useTimeZones()
  const [, , openModal] = timeZonesModel.useModal()

  const [localDate, setLocalDate] = useState(dayjs().tz())
  useMount(() => {
    const interval = setInterval(() => setLocalDate(dayjs().tz()), 1000)

    return () => clearInterval(interval)
  })

  return (
    <Stack flex={1} minHeight={0}>
      <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
        <LocalTime date={localDate} />

        {timeZones.length > 0 && (
          <StyledList>
            {timeZones.map((timeZone) => (
              <ListItem key={timeZone.tz}>
                <Item timeZone={timeZone} localDate={localDate} />
              </ListItem>
            ))}
          </StyledList>
        )}
      </Stack>

      <Stack justifyContent='center' alignItems='center' direction='row'>
        <IconButton onClick={() => openModal()}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Stack>

      <TimeZones />
    </Stack>
  )
}
