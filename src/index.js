import React from 'react';
import { render } from 'react-dom';
import Root from './components/root'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

// Create the application store
const store = createStore(rootReducer);

// Render out the root of the application
render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Root />
        </ThemeProvider>
    </Provider>
    ,
    document.getElementById('root')
);