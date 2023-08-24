import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'

import { Alarm } from './types'

export function isSameTwoAlarmsFromToday(a: Alarm, b: Alarm) {
  return getTimeFromToday(a.time).isSame(getTimeFromToday(b.time))
}
