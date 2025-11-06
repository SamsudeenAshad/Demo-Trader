import { createTheme } from '@mui/material/styles';

// Binance-inspired color palette
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F0B90B', // Binance Yellow
      light: '#F8D12F',
      dark: '#C89B09',
      contrastText: '#0B0E11',
    },
    secondary: {
      main: '#0ECB81', // Success Green
      light: '#2EE19B',
      dark: '#0BA066',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F6465D', // Sell Red
      light: '#FF6B80',
      dark: '#D63649',
    },
    warning: {
      main: '#F0B90B',
    },
    info: {
      main: '#3861FB',
    },
    success: {
      main: '#0ECB81',
    },
    background: {
      default: '#0B0E11', // Dark background
      paper: '#1E2329', // Card background
    },
    text: {
      primary: '#EAECEF', // Primary text
      secondary: '#848E9C', // Secondary text
    },
    divider: '#2B3139',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1E2329',
        },
      },
    },
  },
});
