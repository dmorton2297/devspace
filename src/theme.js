import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#232C35',
    mainTransparent: 'rgba(34, 44, 54, 0.98)',
    light: '#fcfcfc',
    lightAlternate: '#f8f8ff',
    lightAlternateTransparent: 'rgba(248, 248, 255, 0.4)',
    dark: '#232C35',
    darkAlternate: '#0f1317',
    warn: '#f44336',
    medium: '#ebebeb'
  },
};

export const typography = {
  h1: {
    fontSize: 26,
    fontWeight: 400
  },
  h2: {
    fontSize: 18
  },
  h3: {
    fontSize: 14
  },
  body1: {
    fontSize: 12
  },
  body2: {
    fontSize: 12
  },
  bold: {
    fontWeight: 500
  }
}

export const overrides = {
  MuiCard: {
    root: {
      padding: '20px 50px',
      margin: '10px 0 30px 0',
      borderRadius: '0px !important',
      outline: `1px solid ${palette.primary.main  } !important`,
      zIndex: 0,
      boxShadow: '5px 8px #ebeced',
      '@media(max-width: 1000px)': {
        padding: 20,
        margin: '10px 10px'
      }
    },
  },
  MuiIconButton: {
    root: {
      padding: '0 5px'
    }
  },
  MuiFormControl: {
    root: {
      width: '100%',
      margin: '10px 0'
    },
  },
  MuiGrid: {
    item: {
      paddingTop: 0
    }
  },
  MuiSnackbar: {
    root: {
      minWidth: '100%'
    }
  },
  MuiButton: {
    root: {
      borderRadius: 0,
      boxShadow: '5px 5px #888888'
    }
  }
}

const theme = createMuiTheme({
  typography,
  palette,
  overrides,
});

export default theme;