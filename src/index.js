import React from 'react';
import { render } from 'react-dom';
import Root from './components/views/root'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import { setItem } from './utils/localStorage';


// Create the application store
const store = createStore(rootReducer);
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setItem('_auth', true);
        setItem('email', user.email);

    } else {
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