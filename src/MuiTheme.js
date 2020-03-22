import createMuiTheme  from '@material-ui/core/styles/createMuiTheme'
import {Colors} from './colors'
export const MENU_BAR_HEIGHT_IN_PX = 50


export const heatMap = [
  '#cccccc',
  '#108400',
  '#8ACB23',
  '#F2CB2C',
  '#F26649',
  '#DE0000'
]

export const theme = createMuiTheme({
  props: {
    MuiInput: {
      disableUnderline: true
    },
    MuiButtonBase: {
      disableRipple: true
    }
  },
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: Colors.lightTeal
    },
    textPrimary: {
      color: Colors.navy
    }
  },
  typography: {
    h1 : {
      fontSize: "32px",
      fontWeight: 300
    },
    h2: {
      fontSize: "24px",
      fontWeight: 400
    },
    h3: {
      fontSize: "20px",
      fontWeight: 400
    },
    h4: {
      fontSize: "18px",
      fontWeight: 400
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 400
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 400
    },
    body1: {
      fontSize: "16px",
      fontWeight: 200
    },
    body2: {
      fontSize: "14px",
      fontWeight: 200
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400
    },
    link : {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.00714em",
      lineHeight: 1.57
    }
  },
  overrides: {
    MuiToolbar: {
      root: {
        justifyContent: 'space-between',
      },
      regular: {
        minHeight: `${MENU_BAR_HEIGHT_IN_PX}px !important`
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'none',
        }
      }
    },
    MuiAlert: {
      standardSuccess: {
        backgroundColor: Colors.lightTurqouise,
        '& $icon': {
          color: Colors.darkTeal
        }
      },
      message: {
        color: Colors.navy
      }
    },
    MuiCheckbox: {
      root: {
        '&$checked': {
          color: Colors.lightTeal
        }
      }
    },
    MuiRadio: {
      colorSecondary: {
        color: Colors.gray25
      }
    }
  }
})
