import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import AlarmIcon from '@mui/icons-material/Alarm'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import IconButton from '@mui/material/IconButton'
import { useLocation, useNavigate } from 'react-router-dom'

import { PathEnum } from '~/shared/config/constants'

const nav = [
  { link: PathEnum.Alarm, icon: <AlarmIcon /> },
  { link: PathEnum.TimeZone, icon: <ScheduleIcon /> },
  { link: PathEnum.Timer, icon: <TimerOutlinedIcon /> },
  { link: PathEnum.Stopwatch, icon: <HourglassEmptyIcon /> },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AppBar position='static'>
      <Container>
        <Stack width='100%' alignItems='center'>
          <Stack direction='row' justifyContent='center' spacing={2}>
            {nav.map((item) => (
              <IconButton
                key={item.link}
                onClick={() => navigate(item.link)}
                color={location.pathname === item.link ? 'inherit' : 'default'}
              >
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  )
}
