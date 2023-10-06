import { createDomain } from 'effector'
import { useUnit } from 'effector-react'

import { createClock } from '~/shared/lib/factories'

export const domain = createDomain('widgets.clock.timer')

export const {
  $time,
  $status,
  statusNewSet,
  statusInProgressSet,
  statusStoppedSet,
  useStatus,
  useTime,
  useStatusEvent,
} = createClock(domain)

/* Time Logic */
export const oneSecondAdded = domain.createEvent()
$time.on(oneSecondAdded, (time) => time.add(1, 'seconds'))

export const useOneSecondAdded = () => useUnit(oneSecondAdded)
