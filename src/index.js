import React from 'react';
import { render } from 'react-dom';
import Root from './components/root'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


render(
    <ThemeProvider theme={theme}>
        <Root />
    </ThemeProvider>,
    document.getElementById('root')
);