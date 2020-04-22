import React, { useEffect, useState, useRef } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../default-button';
import { Typography, Card, Grid, IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects } from '../../services/webService';
import { setProjects } from '../../actions/projectsActions';
import ProjectCard from '../project-card';
import ProjectModal from '../modals/project-modal';
import AddIcon from '@material-ui/icons/Add';
import { object, bool } from 'prop-types';
import AddProjectModal from '../modals/add-project-modal';
import theme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';

const Profile = ({ classes, user, readOnly }) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer);
    const projectsSection = useRef();
    const overviewCard = useRef();

    const [selectedProject, setSelectedProject] = useState(null);
    const [addProject, setAddProject] = useState(false);
    const [success, showSuccess] = useState(null);

    useEffect(() => {
        getUserProjects(user.id).then((res) => {
            dispatch(setProjects(res.data));
        }).catch(error => {
            console.error(error);
        })

        const onScroll = () => {
            const position = projectsSection.current.getBoundingClientRect();
            const cardRect = overviewCard.current.getBoundingClientRect();
            console.log(cardRect);
            if (position.y <= cardRect.bottom) {
                const percentage = (cardRect.bottom - position.y) / cardRect.bottom;
                overviewCard.current.style.backgroundColor = `rgba(0, 0, 0, ${percentage}`;
                overviewCard.current.style.boxShadow = 'none';
            } else {
                overviewCard.current.style.backgroundColor = theme.palette.primary.light;
                overviewCard.current.style.boxShadow = '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';

            }
        }
        const scrollContainer = document.getElementById('scroll-container');
        scrollContainer.addEventListener('scroll', onScroll);
        return () => {
            scrollContainer.removeEventListener('scroll', onScroll)
        }
    }, [dispatch, user]);

    const openProjectModal = (project) => {
        setSelectedProject(project);
    }

    const closeProjectModal = () => {
        setSelectedProject(null);
    }

    const showSuccessMessage = (message) => {
        console.log(message);
        showSuccess(message);
    }



    return (
        <div className={classNames(classes.container, 'profile-container')}>
            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => showSuccess(null)} >
                <SnackbarContent className='snackbar-width' message={success} action={<IconButton style={{ color: 'white' }} onClick={() => showSuccess(null)}><CloseIcon /></IconButton>} />
            </Snackbar>
            <ProjectModal open={!!selectedProject} project={selectedProject} onClose={closeProjectModal} ariaLabelledBy='View Project' ariaDsescribedBy='View Project' />
            <AddProjectModal showSuccess={showSuccessMessage} open={addProject} currUser={user} onClose={() => setAddProject(false)} ariaLabelledBy='Add Project' ariaDsescribedBy='Add Project' />

            <div className={classes.topPortion}>
                <Card ref={overviewCard}>
                    <div className={classes.topPortion}>
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
            </div>

            <div className={classes.projects}>
                <div className={classes.projectsHeader} ref={projectsSection}>
                    <Typography variant="h1">Projects</Typography>
                    {!readOnly &&
                        <IconButton onClick={() => setAddProject(true)}>
                            <AddIcon />
                        </IconButton>
                    }
                </div>
                <Grid className={classes.projectCards} container spacing={3}>
                    {projects.map(project => (
                        <Grid item xs={4} key={project.id}>
                            <ProjectCard showSuccess={showSuccessMessage} currUser={user} project={project} onClick={() => openProjectModal(project)} />
                        </Grid>
                    ))}
                    {projects.length === 0 &&
                        <Grid item xs={12}>
                            <Typography variant="h2" className={classes.noProjectsMessage}>No projects have been created.</Typography>
                        </Grid>
                    }
                </Grid>
            </div>
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
