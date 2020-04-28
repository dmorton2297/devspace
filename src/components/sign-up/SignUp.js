import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import classNames from 'classnames';
import { object } from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import DefaultButton from '../shared/default-button';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { setItem } from '../../utils/localStorage';

const SignUp = ({ classes }) => {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordMatch: ''
    })

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(state.email, state.password).then((res) => {
            firebase.auth().signInWithEmailAndPassword(state.email, state.password).then((r) => {
                firebase.auth().currentUser.getIdToken(true).then(cookie => {
                    setItem('auth', cookie);
                })
            })
        })
        console.log('sign up');
    }

    const login = () => {
        history.push('/login');
    }

    return (
        <div className={classNames(classes.container, 'container', 'flex-vert')}>
            <div className={classes.signUpControl}>
                <Typography variant='h1'>Sign Up</Typography>
                <div className='form-section'>
                    <TextField variant="outlined" label="Email" defaultValue={state.title} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, email: event.target.value })
                        }} />
                    <TextField variant="outlined" type="password" label="Password" defaultValue={state.pasword} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, password: event.target.value })
                        }} />
                    <TextField variant="outlined" type="password" label="Confirm Password" defaultValue={state.pasword} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, passwordMatch: event.target.value })
                        }} />
                </div>
                <div className='flex'>
                    <DefaultButton onClick={signUp}>Sign Up</DefaultButton>
                    <DefaultButton onClick={login}>Login</DefaultButton>
                </div>
            </div>
        </div>
    )
};

SignUp.propTypes = {
    classes: object.isRequired
}

export default withStyles(styles)(SignUp);
