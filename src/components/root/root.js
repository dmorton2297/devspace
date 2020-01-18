import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import { object } from 'prop-types';
import { useSelector } from 'react-redux'

/**
 * Root Component of portfolium-frontend.
 * @param {object} $0 - Object holding the props for this object.
 * @param {object} $0.classes - Styling classes. 
 */
const Root = ({ classes }) => {
    // Get the user from the redux store.
    const user = useSelector(state => state.user);

    return (
        <div className={classNames(classes.root, 'root')}>
            <h1>{user.name}</h1>
        </div>
    );
};

Root.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Root);
