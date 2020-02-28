import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#567E8E',
    light: '#F4F3EA',
    dark: '#232C35'
  },
};

const theme = createMuiTheme({
  palette
});

export default theme;