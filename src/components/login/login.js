import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import classNames from 'classnames';
import { object } from 'prop-types';

const Login = ({ classes }) => {
    return (
        <div className={classNames(classes.container, 'container')}>
            <h1>Login Page</h1>
        </div>
    );
};

Login.propTypes = {
    classes: object.isRequired
}

export default withStyles(styles)(Login);
