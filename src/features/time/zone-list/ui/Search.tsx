import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'react-use'

import { search } from '../model'

export function Search() {
  const [value, setValue] = useState<string>('')
  useDebounce(() => search(value), 500, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <TextField value={value} onChange={handleChange} size='small' autoFocus />
  )
}
