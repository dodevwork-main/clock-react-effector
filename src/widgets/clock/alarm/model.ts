import { createDomain, sample } from 'effector'
import { createGate, useUnit } from 'effector-react'

import { Alarm, alarmModel } from '~/entities/alarm'
import { createModal } from '~/shared/lib/factories'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'
import { notificationsModel } from '~/shared/lib/notifications'
import { TIME_FORMAT_MAIN } from '~/shared/config/constants'

const { isSameTwoAlarmsFromToday } = alarmModel

const domain = createDomain('widgets.alarm')
export const Gate = createGate({ domain })

export const alarmSet = domain.createEvent<Alarm>()
export const alarmSwitched = domain.createEvent<Alarm>()
export const alarmRemoved = domain.createEvent<Alarm>()
const $alarms = domain
  .createStore<Alarm[]>([])
  .on(alarmSet, (state, payload) => {
    if (state.some((item) => isSameTwoAlarmsFromToday(item, payload))) {
      return state
    }

    const newState = [...state, payload]

    return newState.sort((a, b) => {
      const timeA = getTimeFromToday(a.time)
      const timeB = getTimeFromToday(b.time)

      if (timeA.isSame(timeB)) {
        return 0
      }

      if (timeA.isAfter(timeB)) {
        return 1
      }

      return -1
    })
  })
  .on(alarmRemoved, (state, payload) =>
    state.filter((item) => !isSameTwoAlarmsFromToday(item, payload)),
  )
  .on(alarmSwitched, (state, payload) =>
    state.map((item) => {
      if (isSameTwoAlarmsFromToday(item, payload)) {
        item.isOn = !item.isOn
      }

      return item
    }),
  )

export const alarmDone = domain.createEvent<Alarm>()
sample({
  clock: alarmDone,
  fn: (alarm) => ({
    message: `Alarm - ${alarm.time.format(TIME_FORMAT_MAIN)}`,
    variant: 'info' as const,
  }),
  target: notificationsModel.snackbarEnqueued,
})
sample({
  clock: alarmDone,
  target: alarmSwitched,
})

export const { $modal, useModal, modalOpened } = createModal(domain)
$modal.reset([Gate.close, alarmSet])

export const useAlarms = () => useUnit($alarms)
