import { createRoot } from 'react-dom/client'
import { attachLogger } from 'effector-logger'

import { App } from '~/app'
import { isDevEnv } from '~/shared/config/env'
import './global.css'

if (isDevEnv) {
  attachLogger()
}

createRoot(document.getElementById('root')!).render(<App />)
