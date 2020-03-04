import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../default-button';


const Profile = ({ classes, user }) => {
    console.log(user);
    return (
        <div className={classNames(classes.container, 'profile-container')}>
            <div className={classes.header}>
                <h1 className={classes.headerText}>{user.name}'s Portfolio</h1>
                <div className={classes.tags}>
                    {user.tags.map(x => (
                        <p className={classes.tag}>{x}</p>
                    ))}
                </div>
            </div>
            <div className={classNames(classes.infoContainer)}>
                <div className={classNames(classes.imageContainer)}>
                    <img src={user.profileImage} width="320px" height="320px" alt="test" />
                </div>
                <div className={classNames(classes.generalInfoContainer)}>
                    <div>
                        <h2 className={classNames(classes.infoItem)}>{user.title}</h2>
                        <h3 className={classNames(classes.infoItem, classes.company)}>{user.company}</h3>
                        <h3 className={classNames(classes.infoItem)}>Contact: {user.email}</h3>
                        <p className={classNames(classes.infoItem, classes.summary)}>"{user.summary}"</p>
                        <div className={classes.socialButtons}>
                            <DefaultButton>Github</DefaultButton>
                            <DefaultButton>LinkedIn</DefaultButton>
                        </div>
                    </div>
                </div>

            </div>
            <div className={classNames(classes.projectsContainer)}>
                <h2 className={classes.projectsHeader}>Projects</h2>
            </div>
        </div>
    )
}

export default withStyles(styles)(Profile);
