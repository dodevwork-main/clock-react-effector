import Stack from '@mui/material/Stack'
import { useGate } from 'effector-react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { Gate, useList, useModal } from '../model'

import { Search } from './Search'
import { Item } from './Item'

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': { height: 'calc(100% - 64px)' },
})

export function ZoneList() {
  useGate(Gate)

  const [isOpen, closeModal] = useModal()
  const list = useList()

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
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={list.length}
                itemSize={72}
                itemData={list}
              >
                {Item}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Stack>
      </Stack>
    </StyledDialog>
  )
}
