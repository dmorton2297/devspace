import React from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Navigation = ({ classes }) => {
    const user = useSelector(state => state.userReducer);
    console.log(user.user);
    return (
        <div className={classNames(classes.container, 'navigation-container')}>
            <div className={classes.logo}>
                <img src="app-logo.png" alt="app-logo" />
            </div>
            {user.user &&
                <div className={classes.navigationControl}>
                    <button className={classNames(classes.navigationButton, classes.firstNavigationButton)}>Profile</button>
                    <button className={classes.navigationButton}>Blog</button>
                    <button className={classes.navigationButton}>Settings</button>
                </div>
            }
        </div>
    )
}

export default withStyles(styles)(Navigation);
