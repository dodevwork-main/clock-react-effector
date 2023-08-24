import { createDomain } from 'effector'
import dayjs from 'dayjs'

import { TimeZone } from './types'

const domain = createDomain('entities.time-zone')

export const getTimeZoneListFx = domain.createEffect<void, TimeZone[]>({
  handler() {
    return Intl.supportedValuesOf('timeZone').map((timeZone) => {
      const [continent, city] = timeZone.replaceAll('_', ' ').split('/')

      return {
        city,
        continent,
        tz: timeZone,
        gmt: dayjs.tz(undefined, timeZone).format('Z'),
      }
    })
  },
})
