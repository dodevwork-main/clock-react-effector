import Stack from '@mui/material/Stack'
import { useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import DeleteIcon from '@mui/icons-material/Delete'

import { TimeZone } from '~/entities/time-zone'
import { DATE_FORMAT, TIME_FORMAT_MAIN } from '~/shared/config/constants'

import { useTimeZoneRemoved } from '../model'

type Props = {
  timeZone: TimeZone
  localDate: Dayjs
}

export function Item({ timeZone, localDate }: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const date = useMemo(() => dayjs().tz(timeZone.tz), [timeZone, localDate])

  const timeZoneRemoved = useTimeZoneRemoved()

  return (
    <Card sx={{ width: '100%' }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        p={2}
      >
        <Stack>
          <Typography variant='h6'>{date.format(TIME_FORMAT_MAIN)}</Typography>

          <Typography>
            {date.format(DATE_FORMAT)} {timeZone.tz} {timeZone.gmt} GMT
          </Typography>
        </Stack>

        <IconButton onClick={() => timeZoneRemoved(timeZone)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
