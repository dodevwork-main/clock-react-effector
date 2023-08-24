import {
  $status,
  $time,
  statusInProgressSet,
  statusNewSet,
  statusStoppedSet,
  useStatus,
} from './model'

export const timeClockModel = {
  $status,
  $time,
  statusNewSet,
  statusInProgressSet,
  statusStoppedSet,
  useStatus,
}
export { Clock as TimeClock } from './ui'
export { StatusEnum as TimeClockStatusEnum } from './constants'
