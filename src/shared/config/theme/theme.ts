import { createTheme } from '@mui/material/styles'

import { typography } from './typography'

export const theme = createTheme({
  typography,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'visible',
        },
      },
    },
  },
})
