import { afterAll, beforeEach, describe, expect, vi } from 'vitest'
import { allSettled, fork, hydrate } from 'effector'
import { RenderResult, within } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import dayjs from 'dayjs'

import { renderWithEffector } from '@tests/renderers'
import { TimeZone as TimeZoneType } from '~/entities/time-zone'
import { click } from '@tests/commands'
import { timeZonesModel } from '~/features/time/zones'
import { notificationsModel } from '~/shared/lib/notifications'
import { delay } from '~/shared/lib/delay'
import { TIME_FORMAT_MAIN } from '~/shared/config/constants'

import { $timeZones, domain } from '../model'
import { TimeZone } from '../ui'

const timeZonesFixture: TimeZoneType[] = [
  {
    city: 'Abidjan',
    continent: 'Africa',
    tz: 'Africa/Abidjan',
    gmt: '+00:00',
  },
  {
    city: 'Accra',
    continent: 'Africa',
    tz: 'Africa/Accra',
    gmt: '+00:00',
  },
  {
    city: 'Addis Ababa',
    continent: 'Africa',
    tz: 'Africa/Addis_Ababa',
    gmt: '+03:00',
  },
]

describe('TimeZone component test', () => {
  const mockSnackbarEnqueued = vi.fn()
  const mockModalOpened = vi.fn()

  const scope = fork(domain)

  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = renderWithEffector(<TimeZone />, { scope })
  })

  afterAll(() => {
    vi.clearAllMocks()

    act(() => {
      hydrate(scope, {
        values: [[$timeZones, []]],
      })
    })
  })

  it('Should increase the time by 2 seconds', async () => {
    const localTime = dayjs().tz()

    await act(async () => {
      await delay(2000)
    })

    const localTimeHeader = renderResult.getByText(
      localTime.add(2, 'seconds').format(TIME_FORMAT_MAIN),
    )

    expect(localTimeHeader).toBeVisible()
  })

  it('Should add selectedTimeZone to store', async () => {
    await act(async () => {
      await allSettled(timeZonesModel.timeZoneSelected, {
        scope,
        params: timeZonesFixture[0],
      })
    })

    expect(scope.getState($timeZones)).toStrictEqual([timeZonesFixture[0]])
  })

  it('Should not add TimeZone to store, if store already have TimeZone', async () => {
    act(() => {
      hydrate(scope, { values: [[$timeZones, timeZonesFixture]] })
    })

    await act(async () => {
      await allSettled(timeZonesModel.timeZoneSelected, {
        scope,
        params: timeZonesFixture[0],
      })
    })

    expect(scope.getState($timeZones)).toStrictEqual(timeZonesFixture)
  })

  it('Should show notification, if store already have TimeZone', async () => {
    notificationsModel.snackbarEnqueued.watch(mockSnackbarEnqueued)
    act(() => {
      hydrate(scope, { values: [[$timeZones, timeZonesFixture]] })
    })

    await act(async () => {
      await allSettled(timeZonesModel.timeZoneSelected, {
        scope,
        params: timeZonesFixture[0],
      })
    })

    expect(mockSnackbarEnqueued).toHaveBeenCalledWith({
      message: 'TimeZone already on the list',
      variant: 'warning',
    })
  })

  it('Should open modal, if click AddIcon button', async () => {
    timeZonesModel.modalOpened.watch(mockModalOpened)

    await click(renderResult.getByTestId('AddIcon'))

    expect(mockModalOpened).toHaveBeenCalledOnce()
  })

  it('Should delete first TimeZone, if select TimeZone and click DeleteIcon button', async () => {
    act(() => {
      hydrate(scope, { values: [[$timeZones, timeZonesFixture]] })
    })

    const items = renderResult.getAllByRole('listitem')

    await click(within(items[0]).getByRole('button'))

    expect(scope.getState($timeZones)).toStrictEqual([
      timeZonesFixture[1],
      timeZonesFixture[2],
    ])
  })
})
