import { createDomain, sample } from 'effector'
import { createGate, useUnit } from 'effector-react'

import { Alarm, alarmModel } from '~/entities/alarm'
import { createModal } from '~/shared/lib/factories'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'
import { notificationsModel } from '~/shared/lib/notifications'
import { TIME_FORMAT_MAIN } from '~/shared/config/constants'

const { isSameTwoAlarmsFromToday } = alarmModel

export const domain = createDomain('widgets.clock.alarm')
export const Gate = createGate({ domain })

const alarmSwitched = domain.createEvent<Alarm>()
const alarmRemoved = domain.createEvent<Alarm>()
export const $alarms = domain
  .createStore<Alarm[]>([])
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

/* Set */
const alarmSet = domain.createEvent<Alarm>()
sample({
  clock: alarmSet,
  source: $alarms,
  filter: (list, alarm) =>
    list.some((item) => isSameTwoAlarmsFromToday(item, alarm)),
  fn: () => ({
    message: 'Alarm already on the list',
    variant: 'warning' as const,
  }),
  target: notificationsModel.snackbarEnqueued,
})
sample({
  clock: alarmSet,
  source: $alarms,
  filter: (list, alarm) =>
    list.every((item) => !isSameTwoAlarmsFromToday(item, alarm)),
  fn: (list, alarm) => {
    const newState = [...list, alarm]

    return newState.sort((a, b) => {
      const timeA = getTimeFromToday(a.time)
      const timeB = getTimeFromToday(b.time)

      if (timeA.isAfter(timeB)) {
        return 1
      }

      return -1
    })
  },
  target: $alarms,
})

/* Done */
const alarmDone = domain.createEvent<Alarm>()
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

/* Modal */
export const { $modal, useModal, modalOpened } = createModal(domain)
$modal.reset([Gate.close, alarmSet])

export const useAlarms = () => useUnit($alarms)
export const useAlarmEvent = () =>
  useUnit({
    alarmSet,
    alarmSwitched,
    alarmRemoved,
    alarmDone,
  })
