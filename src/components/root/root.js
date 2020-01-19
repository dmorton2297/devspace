import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { object } from 'prop-types';
import Login from '../login';

const Root = ({ classes }) => {
    return (
        <div className={classNames(classes.root, 'root')}>
            <Login />
        </div>
    )
};

Root.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Root);
