import { beforeEach, describe, expect } from 'vitest'
import { fork } from 'effector'

import { renderWithEffector } from '@tests/renderers'

import { Alarm } from '../ui'
import { domain } from '../model'

describe('Alarm component test', () => {
  const scope = fork(domain)

  beforeEach(() => {
    renderWithEffector(<Alarm />, { scope })
  })

  it('Should some', async () => {
    expect(1 + 1).toStrictEqual(2)
  })
})
