import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { ListChildComponentProps } from 'react-window'

import { TimeZone } from '~/entities/time-zone'

import { useTimeZoneSelected } from '../model'

type Props = ListChildComponentProps<TimeZone[]>

export function Item({ data, index, style }: Props) {
  const timeZone = data[index]

  const timeZoneSelected = useTimeZoneSelected()

  return (
    <ListItem style={{ ...style, width: '100%' }}>
      <ListItemButton onClick={() => timeZoneSelected(timeZone)}>
        <ListItemText>
          <Typography>{timeZone.city}</Typography>

          <Typography>
            {timeZone.continent} - GMT {timeZone.gmt}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
