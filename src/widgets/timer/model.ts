import { createDomain, sample } from 'effector'
import { Dayjs } from 'dayjs'

import { timeClockModel } from '~/features/time/clock'
import { notificationsModel } from '~/shared/lib/notifications'
import { TIME_FORMAT_CLOCK } from '~/shared/config/constants'
import { zeroTime } from '~/shared/lib/zeroTime'

const { $time, statusNewSet, statusInProgressSet } = timeClockModel

const domain = createDomain('widgets.timer')
/* Set Timer */
export const timeSet = domain.createEvent<Dayjs>()
const $startTime = domain
  .createStore<Dayjs | null>(null)
  .on(timeSet, (_, time) => time)
  .reset(statusNewSet)

$time.on(timeSet, (_, date) => date)
sample({
  clock: timeSet,
  target: statusInProgressSet,
})

/* Time Logic */
export const oneSecondSubtracted = domain.createEvent()
sample({
  clock: oneSecondSubtracted,
  source: $time,
  filter: (time) => time.isAfter(zeroTime),
  fn: (time) => time.subtract(1, 'seconds'),
  target: $time,
})
sample({
  clock: oneSecondSubtracted,
  source: { time: $time, start: $startTime },
  filter: ({ time, start }) => time.isSame(zeroTime) && start !== null,
  fn: ({ start }) => ({
    message: `Timer - ${start?.format(TIME_FORMAT_CLOCK)}`,
    variant: 'info' as const,
  }),
  target: [notificationsModel.snackbarEnqueued, statusNewSet],
})