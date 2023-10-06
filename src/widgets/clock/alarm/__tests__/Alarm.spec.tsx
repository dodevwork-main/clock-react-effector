import { afterAll, beforeEach, describe, expect, vi } from 'vitest'
import { fork, hydrate } from 'effector'
import { RenderResult, within } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import dayjs from 'dayjs'

import { click } from '@tests/commands'
import { Alarm as AlarmType } from '~/entities/alarm'
import { renderWithEffector } from '@tests/renderers'
import { notificationsModel } from '~/shared/lib/notifications'
import { delay } from '~/shared/lib/delay'
import { TIME_FORMAT_MAIN } from '~/shared/config/constants'

import { Alarm } from '../ui'
import { $alarms, domain } from '../model'

const alarmsFixture: AlarmType[] = [
  { isOn: false, time: dayjs().hour(1).minute(0).second(0) },
  { isOn: true, time: dayjs().hour(2).minute(0).second(0) },
  { isOn: false, time: dayjs().hour(3).minute(0).second(0) },
]

describe('Alarm component test', () => {
  const mockSnackbarEnqueued = vi.fn()

  const scope = fork(domain)

  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = renderWithEffector(<Alarm />, { scope })
  })

  afterAll(() => {
    vi.clearAllMocks()

    act(() => {
      hydrate(scope, {
        values: [[$alarms, []]],
      })
    })
  })

  it('Should turn off, when time ran out', async () => {
    const time = dayjs().add(1, 'seconds')

    act(() => {
      hydrate(scope, { values: [[$alarms, [{ isOn: true, time }]]] })
    })

    await act(async () => {
      await delay(1000)
    })

    expect(scope.getState($alarms)).toStrictEqual([{ isOn: false, time }])
  })

  it('Should show notification, when alarm time ran out', async () => {
    notificationsModel.snackbarEnqueued.watch(mockSnackbarEnqueued)
    const time = dayjs().add(1, 'seconds')

    act(() => {
      hydrate(scope, { values: [[$alarms, [{ isOn: true, time }]]] })
    })

    await act(async () => {
      await delay(1000)
    })

    expect(mockSnackbarEnqueued).toHaveBeenCalledWith({
      message: `Alarm - ${time.format(TIME_FORMAT_MAIN)}`,
      variant: 'info',
    })
  })

  it('Should not turn off Alarm, if alarm time is now or before', async () => {
    const alarm: AlarmType = { isOn: true, time: dayjs() }

    act(() => {
      hydrate(scope, { values: [[$alarms, [alarm]]] })
    })

    await act(async () => {
      await delay(1000)
    })

    expect(scope.getState($alarms)).toStrictEqual([alarm])
  })

  it('Should add and sort Alarm', async () => {
    act(() => {
      hydrate(scope, { values: [[$alarms, alarmsFixture]] })
    })

    await click(renderResult.getByTestId('AddIcon'))

    await click(renderResult.getByLabelText('1 hours'))
    await click(renderResult.getByLabelText('1 minutes'))
    await click(renderResult.getByLabelText('1 seconds'))
    await click(renderResult.getByLabelText('AM'))

    await click(renderResult.getByText('Submit'))

    const items = await renderResult.findAllByRole('listitem')

    const alarm = within(items[1]).getByText('01:01:01 am')

    expect(alarm).toBeVisible()
  })

  it('Should show notification after set, if Alarm already on the list', async () => {
    notificationsModel.snackbarEnqueued.watch(mockSnackbarEnqueued)

    act(() => {
      hydrate(scope, { values: [[$alarms, alarmsFixture]] })
    })

    await click(renderResult.getByTestId('AddIcon'))

    await click(renderResult.getByLabelText('1 hours'))
    await click(renderResult.getByLabelText('0 minutes'))
    await click(renderResult.getByLabelText('0 seconds'))
    await click(renderResult.getByLabelText('AM'))

    await click(renderResult.getByText('Submit'))

    expect(mockSnackbarEnqueued).toHaveBeenCalledWith({
      message: 'Alarm already on the list',
      variant: 'warning',
    })
  })

  it('Should delete first Alarm, if select and click DeleteIcon button', async () => {
    act(() => {
      hydrate(scope, { values: [[$alarms, alarmsFixture]] })
    })

    const items = renderResult.getAllByRole('listitem')

    await click(within(items[0]).getByRole('button'))

    expect(scope.getState($alarms)).toStrictEqual([
      alarmsFixture[1],
      alarmsFixture[2],
    ])
  })

  it('Should turn on first Alarm, if select and click Switcher', async () => {
    act(() => {
      hydrate(scope, { values: [[$alarms, alarmsFixture]] })
    })

    const items = renderResult.getAllByRole('listitem')

    await click(within(items[0]).getByRole('checkbox'))

    expect(scope.getState($alarms)).toStrictEqual([
      { isOn: true, time: alarmsFixture[0].time },
      alarmsFixture[1],
      alarmsFixture[2],
    ])
  })
})
