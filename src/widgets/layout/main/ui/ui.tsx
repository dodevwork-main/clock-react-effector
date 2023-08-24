import Stack from '@mui/material/Stack'
import { ReactNode, Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Loading } from '~/shared/ui/Loading'
import { ErrorBoundary } from '~/shared/ui/ErrorBoundary'

import { Header } from './Header'

type Props = {
  children?: ReactNode
  suspense?: boolean
}

export function Layout({ children = <Outlet />, suspense = true }: Props) {
  return (
    <ErrorBoundary>
      <Stack height='100vh'>
        <Header />

        {suspense ? (
          <Suspense fallback={<Loading />}>{children}</Suspense>
        ) : (
          children
        )}
      </Stack>
    </ErrorBoundary>
  )
}
