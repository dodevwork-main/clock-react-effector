import { createApi, Domain } from 'effector'
import { useUnit } from 'effector-react'
import { Dayjs } from 'dayjs'

import { ClockStatusEnum } from '~/shared/config/constants'
import { zeroTime } from '~/shared/lib/zeroTime'

export function createClock(domain: Domain) {
  const $status = domain.createStore<ClockStatusEnum>(ClockStatusEnum.New)

  const { statusNewSet, statusInProgressSet, statusStoppedSet } = createApi(
    $status,
    {
      statusNewSet: () => ClockStatusEnum.New,
      statusInProgressSet: () => ClockStatusEnum.InProgress,
      statusStoppedSet: () => ClockStatusEnum.Stopped,
    },
  )

  const $time = domain.createStore<Dayjs>(zeroTime).reset(statusNewSet)

  const useStatus = () => useUnit($status)
  const useTime = () => useUnit($time)

  return {
    $status,
    $time,
    statusNewSet,
    statusInProgressSet,
    statusStoppedSet,
    useStatus,
    useTime,
  }
}
