import Stack from '@mui/material/Stack'
import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '@mui/material/Container'
import { styled } from '@mui/material'

const StyledContainer = styled(Container)({
  minHeight: 0,
  flex: 1,
  display: 'flex',
})

type Props = {
  children: ReactNode
  title: string
  isContainer?: boolean
}

export function PageContainer({ children, title, isContainer = true }: Props) {
  return (
    <>
      <Helmet>
        <title>{title} | Clock-React</title>
      </Helmet>

      <Stack flex={1} minHeight={0} component='main'>
        {isContainer ? <StyledContainer>{children}</StyledContainer> : children}
      </Stack>
    </>
  )
}
