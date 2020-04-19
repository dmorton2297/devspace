import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../default-button';
import { Typography, Card, Grid, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../services/webService';
import { setProjects } from '../../actions/projectsActions';
import ProjectCard from '../project-card';
import ProjectModal from '../modals/project-modal';
import AddIcon from '@material-ui/icons/Add';
import { object, bool } from 'prop-types';
import AddProjectModal from '../modals/add-project-modal';


const Profile = ({ classes, user, readOnly }) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer);

    const [selectedProject, setSelectedProject] = useState(null);
    const [addProject, setAddProject] = useState(false);

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


    const openProjectModal = (project) => {
        setSelectedProject(project);
    }

    const closeProjectModal = () => {
        setSelectedProject(null);
    }

    return (
        <div className={classNames(classes.container, 'profile-container')}>
            <ProjectModal open={!!selectedProject} project={selectedProject} onClose={closeProjectModal} ariaLabelledBy='test' ariaDsescribedBy='test' />
            <AddProjectModal open={addProject} onClose={() => setAddProject(false)} ariaLabelledBy='Add Project' ariaDsescribedBy='Add Project' />
            <Card>
                <div className={classes.header}>
                    <Typography variant="h1" className={classes.headerText}>{user.name}'s Portfolio</Typography>
                    <div className={classes.tags}>
                        {user.tags.map(x => (
                            <Typography variant="body1" key={`x${Math.random() * 100}`} className={classes.tag}>{x}</Typography>
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
                <div className={classes.projectsHeader}>
                    <Typography variant="h1">Projects</Typography>
                    {!readOnly &&
                        <IconButton onClick={() => setAddProject(true)}>
                            <AddIcon />
                        </IconButton>
                    }
                </div>
                <Grid container spacing={3}>
                    {projects.map(project => (
                        <Grid item xs={4} key={project.id}>
                            <ProjectCard project={project} onClick={() => openProjectModal(project)} />
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        </div>
    );
};

Profile.propTypes = {
    classes: object.isRequired,
    user: object.isRequired,
    readOnly: bool
};

Profile.defaultProps = {
    readOnly: false
};

export default withStyles(styles)(Profile);
