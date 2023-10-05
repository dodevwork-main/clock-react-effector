import { beforeEach, describe, expect } from 'vitest'
import { fork } from 'effector'

import { renderWithEffector } from '@tests/renderers'

import { TimeZone } from '../ui'
import { domain } from '../model'

describe('TimeZone component test', () => {
  const scope = fork(domain)

  beforeEach(() => {
    renderWithEffector(<TimeZone />, { scope })
  })

  it('Should some', async () => {
    expect(1 + 1).toStrictEqual(2)
  })
})
