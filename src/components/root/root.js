import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core';
import { object } from 'prop-types';
import Login from '../login';
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import classNames from 'classnames';


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
            <Switch>
                <Route path="/" component={Login} />
            </Switch>
        </div>

    );
};

Root.propTypes = {
    classes: object.isRequired
};

export default withStyles(styles)(Root);
