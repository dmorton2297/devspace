import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#567E8E',
    light: '#fcfcfc',
    dark: '#232C35'
  },
};

const theme = createMuiTheme({
  palette
});

export default theme;