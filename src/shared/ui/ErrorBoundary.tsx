import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryPropsWithComponent,
  FallbackProps,
} from 'react-error-boundary'
import Alert from '@mui/material/Alert'
import { PropsWithChildren } from 'react'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'

import { isDevEnv } from '~/shared/config/env'

type Props = PropsWithChildren<
  Omit<ErrorBoundaryPropsWithComponent, 'FallbackComponent'>
>

export function ErrorBoundary(props: Props) {
  const { children, ...restProps } = props

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} {...restProps}>
      {children}
    </ReactErrorBoundary>
  )
}

function ErrorFallback({
  resetErrorBoundary = window.location.reload,
  error,
}: FallbackProps) {
  return (
    <Alert
      color='error'
      action={
        <Button color='error' onClick={resetErrorBoundary}>
          Refresh
        </Button>
      }
    >
      <AlertTitle>An error occurred on the page</AlertTitle>
      If the page error persists after refreshing the page, please contact the
      administrator
      <br />
      {isDevEnv && <b> {error.message}</b>}
    </Alert>
  )
}
