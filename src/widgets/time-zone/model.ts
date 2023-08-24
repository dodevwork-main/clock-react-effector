import { createDomain } from 'effector'
import { useUnit } from 'effector-react'

import { timeZoneListModel } from '~/features/time/zone-list'
import { TimeZone } from '~/entities/time-zone'

const domain = createDomain('widgets.time-zone')

export const timeZoneRemoved = domain.createEvent<TimeZone>()
export const $timeZoneList = domain
  .createStore<TimeZone[]>([])
  .on(timeZoneListModel.timeZoneSelected, (list, timeZone) =>
    list.every((item) => item.tz !== timeZone.tz) ? [...list, timeZone] : list,
  )
  .on(timeZoneRemoved, (list, timeZone) =>
    list.filter((item) => item.tz !== timeZone.tz),
  )

/*
 * TODO [@dodevwork 31.07.23]:
 * Make notification if timeZoneSelected is the same for $timeZone
 * */

export const useTimeZoneList = () => useUnit($timeZoneList)
