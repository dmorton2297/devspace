import React from 'react';
import { render } from 'react-dom';
import Root from './components/root'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom'


// Create the application store
const store = createStore(rootReducer);

// Render out the root of the application
render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Root />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>

    ,
    document.getElementById('root')
);