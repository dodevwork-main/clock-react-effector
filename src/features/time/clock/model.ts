import { createApi, createDomain, sample } from 'effector'
import { createGate, useUnit } from 'effector-react'
import { Dayjs } from 'dayjs'

import { zeroTime } from '~/shared/lib/zeroTime'

import { StatusEnum } from './constants'

const domain = createDomain('features.time.clock')
export const Gate = createGate({ domain })

/* Time Status */
export const $status = domain.createStore<StatusEnum>(StatusEnum.New)

export const { statusNewSet, statusInProgressSet, statusStoppedSet } =
  createApi($status, {
    statusNewSet: () => StatusEnum.New,
    statusInProgressSet: () => StatusEnum.InProgress,
    statusStoppedSet: () => StatusEnum.Stopped,
  })

sample({
  clock: Gate.close,
  target: statusNewSet,
})

/* Main Time */
export const $time = domain.createStore<Dayjs>(zeroTime).reset(statusNewSet)

export const useStatus = () => useUnit($status)
export const useTime = () => useUnit($time)
