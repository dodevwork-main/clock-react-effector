import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import dayjs, { Dayjs } from 'dayjs'

import { DATE_FORMAT, TIME_FORMAT_MAIN } from '~/shared/config/constants'

type Props = {
  date: Dayjs
}

export function LocalTime({ date }: Props) {
  return (
    <Stack flex={1} justifyContent='center' alignItems='center' p={2}>
      <Stack justifyContent='center' alignItems='center'>
        <Typography variant='h5'>Local time</Typography>

        <Typography variant='h3'>{date.format(TIME_FORMAT_MAIN)}</Typography>

        <Typography variant='h5'>{date.format(DATE_FORMAT)}</Typography>

        <Typography variant='h5' fontWeight={400}>
          {dayjs.tz.guess()} {dayjs.tz(undefined, dayjs.tz.guess()).format('Z')}
          {' GMT'}
        </Typography>
      </Stack>
    </Stack>
  )
}
