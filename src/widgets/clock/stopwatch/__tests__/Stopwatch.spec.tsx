import { beforeEach, describe, expect } from 'vitest'
import { fork } from 'effector'

import { renderWithEffector } from '@tests/renderers'

import { Stopwatch } from '../ui'
import { domain } from '../model'

describe('Stopwatch component test', () => {
  const scope = fork(domain)

  beforeEach(() => {
    renderWithEffector(<Stopwatch />, { scope })
  })

  it('Should some', async () => {
    expect(1 + 1).toStrictEqual(2)
  })
})
