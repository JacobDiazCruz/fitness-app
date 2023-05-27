'use client';

import palette from "./palette";
import typography from "./typography";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";

export const theme: Theme = createTheme({
  palette,
  typography,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          // border: 'solid 1px #EAEAEA',
          // boxShadow: '0 2px 4px #33300014',
          // '&:hover': {
          //   boxShadow: '0 5px 12px #e8e8e8'
          // }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 8px 30px rgba(0,0,0,.12)'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'none'
          }
        }
      }
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '.MuiBox-root': {
            borderRadius: '13px',
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        boxShadow: 'none',
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: '8px',

          '&:hover': {
            opacity: 0.9
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '18px'
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '20px 24px'
        }
      }
    }
  }
});