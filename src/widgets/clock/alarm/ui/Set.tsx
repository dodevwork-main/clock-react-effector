import Stack from '@mui/material/Stack'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { SyntheticEvent, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useUpdateEffect } from 'react-use'

import { alarmSet, useModal } from '../model'

export function Set() {
  const [isOpen, closeModal] = useModal()
  const [time, setTime] = useState<Dayjs | null>(null)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (time) {
      alarmSet({ isOn: false, time })
    }
  }

  useUpdateEffect(() => {
    if (isOpen) {
      setTime(dayjs())
    } else {
      setTime(null)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={() => closeModal()}>
      <Stack component='form' onSubmit={handleSubmit} p={2} spacing={2}>
        <MultiSectionDigitalClock
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          views={['hours', 'minutes', 'seconds']}
          value={time}
          onChange={(newTime) => setTime(newTime)}
        />

        <Button type='submit'>Submit</Button>
      </Stack>
    </Dialog>
  )
}
