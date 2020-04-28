import React from 'react';
import { render } from 'react-dom';
import Root from './components/root'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase';
import { setItem } from './utils/localStorage';


// Create the application store
const store = createStore(rootReducer);
const firebaseConfig = {
    apiKey: "AIzaSyAEO387k8-piyw6_ouK8JdSHuid9Y2qAP0",
    authDomain: "devspace-ec004.firebaseapp.com",
    databaseURL: "https://devspace-ec004.firebaseio.com",
    projectId: "devspace-ec004",
    storageBucket: "devspace-ec004.appspot.com",
    messagingSenderId: "186527984862",
    appId: "1:186527984862:web:b2ee3d3da69a88f269e64f"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setItem('_auth', true);
        setItem('email', user.email);

    } else {
        console.log('in here');
        setItem('_auth', false);
    }
});
// Render out the root of the application
render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Root firebase={firebase} />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);