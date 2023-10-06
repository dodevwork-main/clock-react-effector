import { createDomain, sample } from 'effector'
import { useUnit } from 'effector-react'

import { timeZonesModel } from '~/features/time/zones'
import { TimeZone } from '~/entities/time-zone'
import { notificationsModel } from '~/shared/lib/notifications'

export const domain = createDomain('widgets.clock.time-zone')

export const timeZoneRemoved = domain.createEvent<TimeZone>()
export const $timeZones = domain
  .createStore<TimeZone[]>([])
  .on(timeZoneRemoved, (state, payload) =>
    state.filter((item) => item.tz !== payload.tz),
  )

sample({
  clock: timeZonesModel.timeZoneSelected,
  source: $timeZones,
  filter: (list, timeZone) => list.some((item) => item.tz === timeZone.tz),
  fn: () => ({
    message: 'TimeZone already on the list',
    variant: 'warning' as const,
  }),
  target: notificationsModel.snackbarEnqueued,
})
sample({
  clock: timeZonesModel.timeZoneSelected,
  source: $timeZones,
  filter: (list, timeZone) => list.every((item) => item.tz !== timeZone.tz),
  fn: (list, timeZone) => [...list, timeZone],
  target: $timeZones,
})

export const useTimeZones = () => useUnit($timeZones)
export const useTimeZoneRemoved = () => useUnit(timeZoneRemoved)
