import { createMuiTheme } from '@material-ui/core/styles';

export const palette = {
  primary: {
    main: '#FFFFFF',
    light: '#222',
    dark: '#FFFFFF'
  },
};

const theme = createMuiTheme({
  palette
});

export default theme;