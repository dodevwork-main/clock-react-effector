import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMount } from 'react-use'

import { TimeZoneList, timeZoneListModel } from '~/features/time/zone-list'

import { useTimeZoneList } from '../model'

import { LocalTime } from './LocalTime'
import { Item } from './Item'

export function TimeZone() {
  const timeZoneList = useTimeZoneList()

  const [localDate, setLocalDate] = useState(dayjs().tz())
  useMount(() => {
    const interval = setInterval(() => setLocalDate(dayjs().tz()), 1000)

    return () => clearInterval(interval)
  })

  return (
    <Stack flex={1} minHeight={0}>
      <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
        <LocalTime date={localDate} />

        {timeZoneList.length > 0 && (
          <Stack flex={2} spacing={2} width='100%' sx={{ overflowY: 'auto' }}>
            {timeZoneList.map((timeZone) => (
              <Item
                key={timeZone.tz}
                timeZone={timeZone}
                localDate={localDate}
              />
            ))}
          </Stack>
        )}
      </Stack>

      <Stack justifyContent='center' alignItems='center' direction='row'>
        <IconButton onClick={() => timeZoneListModel.modalOpened()}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Stack>

      <TimeZoneList />
    </Stack>
  )
}
