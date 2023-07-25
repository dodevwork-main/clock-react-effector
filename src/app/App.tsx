import * as dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export function App() {
  const [date, setDate] = useState(dayjs())
  useEffect(() => {
    setInterval(() => setDate(dayjs()), 1000)
  })

  return <h1>{date.toString()}</h1>
}
