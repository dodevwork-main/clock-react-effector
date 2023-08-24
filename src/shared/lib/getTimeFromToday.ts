import dayjs, { Dayjs } from 'dayjs'

export function getTimeFromToday(time: Dayjs) {
  return dayjs()
    .set('hour', time.hour())
    .set('minute', time.minute())
    .set('second', time.second())
}
