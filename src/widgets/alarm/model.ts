import { createDomain } from 'effector'
import { createGate, useUnit } from 'effector-react'

import { Alarm, alarmModel } from '~/entities/alarm'
import { createModal } from '~/shared/lib/factories'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'

const { isSameTwoAlarmsFromToday } = alarmModel

const domain = createDomain('widgets.alarm')
export const Gate = createGate({ domain })

export const alarmSet = domain.createEvent<Alarm>()
export const alarmSwitched = domain.createEvent<Alarm>()
export const alarmRemoved = domain.createEvent<Alarm>()
const $alarmList = domain
  .createStore<Alarm[]>([])
  .on(alarmSet, (list, alarm) => {
    if (list.some((item) => isSameTwoAlarmsFromToday(item, alarm))) {
      return list
    }

    const newList = [...list, alarm]

    return newList.sort((a, b) => {
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
  .on(alarmRemoved, (list, alarm) =>
    list.filter((item) => !isSameTwoAlarmsFromToday(item, alarm)),
  )
  .on(alarmSwitched, (list, alarm) =>
    list.map((item) => {
      if (isSameTwoAlarmsFromToday(item, alarm)) {
        item.isOn = !item.isOn
      }

      return item
    }),
  )

export const { $modal, useModal, modalOpened } = createModal(domain)
$modal.reset([Gate.close, alarmSet])

export const useAlarmList = () => useUnit($alarmList)
