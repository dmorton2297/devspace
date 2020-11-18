import React from 'react'
import { withStyles } from '@material-ui/core'
import styles from './styles';
import DefaultButton from '../shared/default-button';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { setItem } from '../../utils/localStorage';

const Settings = () => {
    const history = useHistory();
    const logout = () => {
        firebase.auth().signOut().then(() => {
            setItem('auth', '');
            setItem('email', '');
            history.push('/app/login');
        }, error => console.error(error));
    }
    return (
        <DefaultButton onClick={logout}>Logout</DefaultButton>
    )
}

export default withStyles(styles)(Settings);
