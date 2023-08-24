import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

export function Loading() {
  return (
    <Stack flex={1} justifyContent='center' alignItems='center'>
      <CircularProgress />
    </Stack>
  )
}
