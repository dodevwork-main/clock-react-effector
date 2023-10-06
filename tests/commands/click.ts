import { user } from './user'

export async function click(element: HTMLElement) {
  await user.click(element)
}
