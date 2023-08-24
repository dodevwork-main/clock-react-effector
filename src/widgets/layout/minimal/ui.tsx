import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { ErrorBoundary } from '~/shared/ui/ErrorBoundary'

type Props = {
  children?: ReactNode
}

export function Layout({ children = <Outlet /> }: Props) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}
