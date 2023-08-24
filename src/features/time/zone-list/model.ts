import { attach, createDomain, sample } from 'effector'
import { createGate, useUnit } from 'effector-react'

import { TimeZone, timeZoneModel } from '~/entities/time-zone'
import { createModal } from '~/shared/lib/factories'

const domain = createDomain('features.time.zone-list')
export const Gate = createGate({ domain })

/* Full TimeZone List */
const getTimeZoneListFx = attach({
  effect: timeZoneModel.getTimeZoneListFx,
})
const $timeZoneList = domain
  .createStore<TimeZone[]>([])
  .on(getTimeZoneListFx.doneData, (_, list) => list)
sample({
  clock: Gate.open,
  source: $timeZoneList,
  filter: (list) => list.length === 0,
  target: getTimeZoneListFx,
})

export const timeZoneSelected = domain.createEvent<TimeZone>()
const $displayedTimeZoneList = domain
  .createStore<TimeZone[]>([])
  .reset(Gate.close)

/* Search */
export const search = domain.createEvent<string>()
sample({
  clock: search,
  source: $timeZoneList,
  filter: (list) => list.length > 0,
  fn: (list, searchValues) =>
    list.filter(
      (timeZone) =>
        timeZone.city.toLowerCase().includes(searchValues.toLowerCase()) ||
        timeZone.continent.toLowerCase().includes(searchValues.toLowerCase()),
    ),
  target: $displayedTimeZoneList,
})

/* Modal */
export const { $modal, useModal, modalOpened } = createModal(domain)
$modal.reset([Gate.close, timeZoneSelected])

export const useList = () => useUnit($displayedTimeZoneList)
