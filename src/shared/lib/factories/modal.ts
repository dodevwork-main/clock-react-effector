import { createApi, Domain } from 'effector'
import { useUnit } from 'effector-react'

export function createModal(domain: Domain) {
  const $modal = domain.createStore(false)

  const { modalOpened, modalClosed } = createApi($modal, {
    modalOpened: () => true,
    modalClosed: () => false,
  })

  const useModal = () => useUnit([$modal, modalClosed, modalOpened])

  return { $modal, modalOpened, modalClosed, useModal }
}
