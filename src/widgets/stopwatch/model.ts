import { createDomain } from 'effector'

import { timeClockModel } from '~/features/time/clock'

const { $time } = timeClockModel

const domain = createDomain('widgets.timer')

/* Time Logic */
export const oneSecondAdded = domain.createEvent()
$time.on(oneSecondAdded, (time) => time.add(1, 'seconds'))
