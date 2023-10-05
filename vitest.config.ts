/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      cleanOnRerun: true,
      include: ['src/**/*'],
      exclude: ['src/**/types.ts', 'src/**/index.ts'],
      all: true,
    },
    setupFiles: ['tests/vitest.setup.ts'],
  },
})
