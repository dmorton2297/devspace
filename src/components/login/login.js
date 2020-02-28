import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import classNames from 'classnames';
import { object } from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../actions/userActions';
import { withRouter, useHistory } from 'react-router-dom';
import { loginUser } from '../../services/webService';

const Login = ({ classes }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const history = useHistory();

    // Check to see if the user is logged in
    useEffect(() => {
        if (user.user) {
            history.push('/home');
        }
    }, [user, history])

    const login = () => {
        loginUser('dan@dev.com', 'pass').then((res) => {
            dispatch(setUser(res.data.user));
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className={classNames(classes.container, 'container')}>
            <h1>Login Page</h1>
            <button onClick={login}>Login</button>
        </div>
    );
};

Login.propTypes = {
    classes: object.isRequired,
    history: object.isRequired
}

export default withStyles(styles)(withRouter(Login));