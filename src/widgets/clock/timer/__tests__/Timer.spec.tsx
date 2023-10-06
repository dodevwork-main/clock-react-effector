import { afterAll, beforeEach, describe, expect, vi } from 'vitest'
import { allSettled, fork, hydrate } from 'effector'
import { RenderResult } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { renderWithEffector } from '@tests/renderers'
import { click } from '@tests/commands'
import { zeroTime } from '~/shared/lib/zeroTime'
import { ClockStatusEnum } from '~/shared/config/constants'
import { notificationsModel } from '~/shared/lib/notifications'
import { delay } from '~/shared/lib/delay'

import { $startTime, $status, $time, domain, timeSet } from '../model'
import { Timer } from '../ui'

describe('Timer component test', () => {
  const mockSnackbarEnqueued = vi.fn()

  const scope = fork(domain)

  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = renderWithEffector(<Timer />, { scope })
  })

  afterAll(() => {
    vi.clearAllMocks()

    act(() => {
      hydrate(scope, {
        values: [
          [$startTime, null],
          [$time, null],
          [$status, null],
        ],
      })
    })
  })

  it('Should start time for 5 hours', async () => {
    await click(renderResult.getByLabelText('5 hours'))

    await click(renderResult.getByText('Start'))

    const timer = renderResult.getByText('05:00:00')
    expect(timer).toBeVisible()
  })

  it('Should stop timer', async () => {
    await act(async () => {
      await allSettled(timeSet, { scope, params: zeroTime.add(5, 'hours') })
    })

    await click(renderResult.getByTestId('PauseCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.Stopped)
  })

  it('Should pause timer', async () => {
    await act(async () => {
      await allSettled(timeSet, { scope, params: zeroTime.add(5, 'hours') })
    })

    await click(renderResult.getByTestId('PauseCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.Stopped)
  })

  it('Should stop timer', async () => {
    await act(async () => {
      await allSettled(timeSet, { scope, params: zeroTime.add(5, 'hours') })
    })

    await click(renderResult.getByTestId('StopCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.New)
  })

  it('Should pause and run timer', async () => {
    await act(async () => {
      await allSettled(timeSet, { scope, params: zeroTime.add(5, 'hours') })
    })

    await click(renderResult.getByTestId('PauseCircleIcon'))

    await click(renderResult.getByTestId('PlayCircleIcon'))

    expect(scope.getState($status)).toStrictEqual(ClockStatusEnum.InProgress)
  })

  it('Should make notification if timer was end', async () => {
    notificationsModel.snackbarEnqueued.watch(mockSnackbarEnqueued)

    await act(async () => {
      await allSettled(timeSet, { scope, params: zeroTime.add(1, 'seconds') })
    })

    await act(async () => {
      await delay(1000)
    })

    expect(mockSnackbarEnqueued).toHaveBeenCalledWith({
      message: 'Timer - 00:00:01',
      variant: 'info',
    })
  })
})
