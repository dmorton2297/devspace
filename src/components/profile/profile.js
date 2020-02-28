import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';

const Profile = ({ classes, user }) => {
    return (
        <div className={classNames(classes.container, 'profile-container')}>
            <h1>Profile</h1>
        </div>
    )
}

export default withStyles(styles)(Profile);
