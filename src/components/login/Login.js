import React, { useState } from 'react';
import { withStyles, Typography, TextField } from '@material-ui/core';
import styles from './styles';
import classNames from 'classnames';
import { object } from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import DefaultButton from '../shared/default-button';
import firebase from 'firebase/app';
import 'firebase/auth';
import { setItem, getItem } from '../../utils/localStorage';

const Login = ({ classes }) => {
    const history = useHistory();
    const email = getItem('email');
    const [state, setState] = useState({
        email: email,
        password: ''
    })

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(state.email, state.password).then((res) => {
            firebase.auth().currentUser.getIdToken(true).then(cookie => {
                setItem('auth', cookie);
                history.push('home');
            })
        })
    };

    const signUp = () => {
        history.push('/signup')
    }


    return (
        <div className={classNames(classes.container, 'container', 'flex-vert')}>
            <div className={classes.loginControl}>
                <Typography variant='h1'>Login</Typography>
                <div className='form-section'>
                    <TextField variant="outlined" label="Email" defaultValue={state.email} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, email: event.target.value })
                        }} />
                    <TextField variant="outlined" type="password" label="Password" defaultValue={state.pasword} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, password: event.target.value })
                        }} />
                </div>
                <div className='flex'>
                    <DefaultButton onClick={login}>Login</DefaultButton>
                    <DefaultButton onClick={signUp}>Sign Up</DefaultButton>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    classes: object.isRequired,
    history: object.isRequired
}

export default withStyles(styles)(withRouter(Login));