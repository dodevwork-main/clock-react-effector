import { attach, createDomain, sample } from 'effector'
import { createGate, useUnit } from 'effector-react'

import { TimeZone, timeZoneModel } from '~/entities/time-zone'
import { createModal } from '~/shared/lib/factories'

const domain = createDomain('features.time.zones')
export const Gate = createGate({ domain })

/* All TimeZones */
const getTimeZonesFx = attach({
  effect: timeZoneModel.getTimeZonesFx,
})
const $timeZones = domain
  .createStore<TimeZone[]>([])
  .on(getTimeZonesFx.doneData, (_, payload) => payload)
sample({
  clock: Gate.open,
  source: $timeZones,
  filter: (list) => list.length === 0,
  target: getTimeZonesFx,
})

export const timeZoneSelected = domain.createEvent<TimeZone>()
const $displayedTimeZones = domain.createStore<TimeZone[]>([]).reset(Gate.close)

/* Search */
export const search = domain.createEvent<string>()
sample({
  clock: search,
  source: $timeZones,
  filter: (list) => list.length > 0,
  fn: (list, searchValues) =>
    list.filter(
      (timeZone) =>
        timeZone.city.toLowerCase().includes(searchValues.toLowerCase()) ||
        timeZone.continent.toLowerCase().includes(searchValues.toLowerCase()),
    ),
  target: $displayedTimeZones,
})

/* Modal */
export const { $modal, useModal, modalOpened } = createModal(domain)
$modal.reset([Gate.close, timeZoneSelected])

export const useTimeZones = () => useUnit($displayedTimeZones)
