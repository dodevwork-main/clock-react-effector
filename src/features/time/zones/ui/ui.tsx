import Stack from '@mui/material/Stack'
import { useGate } from 'effector-react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { Gate, useModal, useTimeZones } from '../model'

import { Search } from './Search'
import { Item } from './Item'

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': { height: 'calc(100% - 64px)' },
})

export function Zones() {
  useGate(Gate)

  const [isOpen, closeModal] = useModal()
  const timeZones = useTimeZones()

  return (
    <StyledDialog
      open={isOpen}
      onClose={() => closeModal()}
      scroll='paper'
      fullWidth
    >
      <Stack flex={1} minHeight={0} spacing={2} p={2}>
        <Search />

        <Stack height='100%'>
          {timeZones.length > 0 && (
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={timeZones.length}
                  itemSize={72}
                  itemData={timeZones}
                >
                  {Item}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </Stack>
      </Stack>
    </StyledDialog>
  )
}
