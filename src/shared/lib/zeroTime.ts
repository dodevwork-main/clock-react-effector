import dayjs from 'dayjs'

import { TIME_FORMAT_CLOCK } from '~/shared/config/constants'

export const zeroTime = dayjs('00:00:00', TIME_FORMAT_CLOCK)
