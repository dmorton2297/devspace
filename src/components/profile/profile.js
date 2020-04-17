import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../default-button';
import { Typography, Card, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../services/webService';
import { setProjects } from '../../actions/projectsActions';
import ProjectCard from '../project-card';


const Profile = ({ classes, user }) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer);

    useEffect(() => {
        getUserProjects(user.id).then((res) => {
            dispatch(setProjects(res.data));
        }).catch(error => {
            console.error(error);
        })
    }, [dispatch, user]);

    if (projects.length === 0) {
        return <div></div>;
    }
    console.log(projects);
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
            <React.Fragment>
                <Typography variant="h1">Projects</Typography>
                <Grid container spacing={3}>
                    {projects.map(project => (
                        <Grid item xs={4}>
                            <ProjectCard project={project} key={project.id} />
                        </Grid>
                    ))

                    }
                </Grid>
            </React.Fragment>
        </div>
    )
}

export default withStyles(styles)(Profile);
