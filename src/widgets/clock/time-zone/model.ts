import { createDomain } from 'effector'
import { useUnit } from 'effector-react'

import { timeZonesModel } from '~/features/time/zones'
import { TimeZone } from '~/entities/time-zone'

const domain = createDomain('widgets.time-zone')

export const timeZoneRemoved = domain.createEvent<TimeZone>()
export const $timeZones = domain
  .createStore<TimeZone[]>([])
  .on(timeZonesModel.timeZoneSelected, (state, payload) =>
    state.every((item) => item.tz !== payload.tz) ? [...state, payload] : state,
  )
  .on(timeZoneRemoved, (state, payload) =>
    state.filter((item) => item.tz !== payload.tz),
  )

/*
 * TODO [@dodevwork 31.07.23]:
 * Make notification if timeZoneSelected is the same for $timeZone
 * */

export const useTimeZones = () => useUnit($timeZones)
