import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#567E8E',
    light: '#fcfcfc',
    dark: '#232C35'
  },
};

export const typography = {
  h1: {
    fontSize: 24,
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
  }
}

const theme = createMuiTheme({
  typography,
  palette
});

export default theme;