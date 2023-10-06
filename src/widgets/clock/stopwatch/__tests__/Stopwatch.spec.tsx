import { afterAll, beforeEach, describe, expect, vi } from 'vitest'
import { fork, hydrate } from 'effector'
import { RenderResult } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { renderWithEffector } from '@tests/renderers'
import { click } from '@tests/commands'
import { ClockStatusEnum } from '~/shared/config/constants'

import { Stopwatch } from '../ui'
import { $status, $time, domain } from '../model'

describe('Stopwatch component test', () => {
  const scope = fork(domain)

  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = renderWithEffector(<Stopwatch />, { scope })
  })

  afterAll(() => {
    vi.clearAllMocks()

    act(() => {
      hydrate(scope, {
        values: [
          [$time, null],
          [$status, null],
        ],
      })
    })
  })

  const startStopwatch = async () => {
    await click(renderResult.getByTestId('PlayCircleIcon'))
  }

  it('Should start and stop stopwatch', async () => {
    await startStopwatch()

    await click(renderResult.getByTestId('StopCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.New)
  })

  it('Should pause and restart stopwatch', async () => {
    await startStopwatch()

    await click(renderResult.getByTestId('PauseCircleIcon'))

    await click(renderResult.getByTestId('PlayCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.InProgress)
  })

  it('Should start with zeros', async () => {
    const stopwatch = renderResult.getByText('00:00:00')

    expect(stopwatch).toBeVisible()
  })
})
