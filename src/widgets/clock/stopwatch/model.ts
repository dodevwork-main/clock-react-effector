import { createDomain } from 'effector'

import { createClock } from '~/shared/lib/factories'

export const domain = createDomain('widgets.clock.timer')

export const {
  $time,
  statusNewSet,
  statusInProgressSet,
  statusStoppedSet,
  useStatus,
  useTime,
} = createClock(domain)

/* Time Logic */
export const oneSecondAdded = domain.createEvent()
$time.on(oneSecondAdded, (time) => time.add(1, 'seconds'))
