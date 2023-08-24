import dayjs, { Dayjs } from 'dayjs'

export function getUnixFromNow(date: Dayjs) {
  return date.unix() - dayjs().unix()
}
