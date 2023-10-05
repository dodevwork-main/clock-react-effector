import { beforeEach, describe, expect } from 'vitest'
import { fork } from 'effector'

import { renderWithEffector } from '@tests/renderers'

import { Timer } from '../ui'
import { domain } from '../model'

describe('Timer component test', () => {
  const scope = fork(domain)

  beforeEach(() => {
    renderWithEffector(<Timer />, { scope })
  })

  it('Should some', async () => {
    expect(1 + 1).toStrictEqual(2)
  })
})
