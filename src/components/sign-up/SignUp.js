import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import classNames from 'classnames';
import { object } from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import DefaultButton from '../shared/default-button';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { setItem } from '../../utils/localStorage';
import { validateSignUp, isInvalid } from '../../utils/validator';
import { createUser } from '../../services/webService';

const SignUp = ({ classes }) => {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
        passwordMatch: ''
    });

    const [invalid, setInvalid] = useState([]);

    const signUp = async () => {
        const _validate = await validateSignUp(state);
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([]);
            // eslint-disable-next-line no-unreachable
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password).then((res) => {
                firebase.auth().signInWithEmailAndPassword(state.email, state.password).then((r) => {
                    firebase.auth().currentUser.getIdToken(true).then(cookie => {
                        setItem('auth', cookie);
                        createUser({ email: state.email }).then((res) => {
                            console.log(res);
                        })
                    })
                })
            });
            // TODO Uncomment sign up code above
        }
    }

    const login = () => {
        history.push('/login');
    }

    return (
        <div className={classNames(classes.container, 'container', 'flex-vert')}>
            <div className={classes.signUpControl}>
                <Typography variant='h1'>Sign Up</Typography>
                <Typography variant='body2' className='top-margin'>Welcome to Dev Space! To sign up, please fill out the form below. We wil send you an email to confirm.</Typography>
                <div className='form-section'>
                    <TextField error={isInvalid('email', invalid)} variant="outlined" label="Email" defaultValue={state.title} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, email: event.target.value })
                        }} helperText={isInvalid('email', invalid) ? 'An account already exists with the provided email.' : ''} />
                    <TextField  error={isInvalid('password', invalid)} variant="outlined" type="password" label="Password" defaultValue={state.pasword} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, password: event.target.value })
                        }} helperText={isInvalid('password', invalid) ? 'Cannot be empty' : ''} />
                    <TextField error={isInvalid('passwordConfirm', invalid)} variant="outlined" type="password" label="Confirm Password" defaultValue={state.pasword} placeholder="Name"
                        onChange={(event) => {
                            setState({ ...state, passwordMatch: event.target.value })
                        }} helperText={isInvalid('passwordConfirm', invalid) ? 'Must match the password entered above' : ''}/>
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
