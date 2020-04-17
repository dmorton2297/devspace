import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../default-button';
import { Typography, Card } from '@material-ui/core';


const Profile = ({ classes, user }) => {
    console.log(user);
    return (
        <div className={classNames(classes.container, 'profile-container')}>
            <Card>
                <div className={classes.header}>
                    <Typography variant="h1" className={classes.headerText}>{user.name}'s Portfolio</Typography>
                    <div className={classes.tags}>
                        {user.tags.map(x => (
                            <Typography variant="body1" className={classes.tag}>{x}</Typography>
                        ))}
                    </div>
                </div>
                <div className={classNames(classes.infoContainer)}>
                    <div className={classNames(classes.imageContainer)}>
                        <img src={user.profileImage} width="320px" height="320px" alt="test" />
                    </div>
                    <div className={classNames(classes.generalInfoContainer)}>
                        <div>
                            <Typography variant="h2" className={classNames(classes.infoItem)}>{user.title}</Typography>
                            <Typography variant="h3" className={classNames(classes.infoItem, classes.company)}>{user.company}</Typography>
                            <Typography variant="h3" className={classNames(classes.infoItem)}>Contact: {user.email}</Typography>
                            <Typography variant="h2" className={classNames(classes.infoItem, classes.summary)}>"{user.summary}"</Typography>
                            <div className={classes.socialButtons}>
                                <DefaultButton>Github</DefaultButton>
                                <DefaultButton>LinkedIn</DefaultButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className={classNames(classes.projectsContainer)}>
                <h2 className={classes.projectsHeader}>Projects</h2>
            </div>
        </div>
    )
}

export default withStyles(styles)(Profile);
