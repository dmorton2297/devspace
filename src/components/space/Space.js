import React, { useEffect, useState, useRef } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import classNames from 'classnames';
import DefaultButton from '../shared/default-button';
import { Typography, Card, Grid, IconButton, Snackbar, SnackbarContent, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProjects, updateProfile } from '../../services/webService';
import { setProjects } from '../../actions/projectsActions';
import ProjectCard from '../project-card';
import ProjectModal from '../modals/project-modal';
import AddIcon from '@material-ui/icons/Add';
import { object, bool } from 'prop-types';
import AddProjectModal from '../modals/add-project-modal';
import theme from '../../theme';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { updateUser } from '../../actions/userActions';
import Tag from '../shared/tag';
import { validateProfile, isInvalid } from '../../utils/validator';

/**
 * The Space component
 * @param {object} $0 - object containing the props for this component
 * @param {object} $0.classes - classes object provided by withStyles HOC
 * @param {object} $0.user - current user of the application
 * @param {boolean} $0.readOnly - Determines if the page is readonly or not 
 * @returns {element} - Space component
 */
const Space = ({ classes, user, readOnly }) => {
    // hooks for talking to redux store
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer);

    // Refs for scrolling effect
    const projectsSection = useRef();
    const overviewCard = useRef();

    // component state
    const [selectedProject, setSelectedProject] = useState(null);
    const [addProject, setAddProject] = useState(false);
    const [editProfile, setEditProfile] = useState(false);
    const [profileInvalid, setProfileInvalid] = useState([]);
    const [success, showSuccess] = useState(null);
    const [tagBuffer, setTagBuffer] = useState(null);
    const [newTag, setNewTag] = useState(null);

    // useEffect to deal with scrolling effect on page
    useEffect(() => {
        getUserProjects(user.id).then((res) => {
            dispatch(setProjects(res.data));
        }).catch(error => {
            console.error(error);
        })

        // TODO: Abstract hacky code for scrolling effect and make it reusable 
        const onScroll = () => {
            const position = projectsSection.current.getBoundingClientRect();
            const cardRect = overviewCard.current.getBoundingClientRect();
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

    /**
     * Opens the view project modal
     * @param {object} project - Project to open
     * @returns {void} - This function does not return anything
     */
    const openProjectModal = (project) => {
        setSelectedProject(project);
    }

    /**
     * Closes the view project modal
     * @returns {void} - This function does not return anything
     */
    const closeProjectModal = () => {
        setSelectedProject(null);
    }

    /**
     * 
     * @param {string} message - Message to show
     * @returns {void} - This function does not return anything 
     */
    const showSuccessMessage = (message) => {
        showSuccess(message);
    }

    /**
     * Handles when a user clicks the edit profile button
     * @returns {void} - This function does not return anything.
     */
    const editProfileClicked = () => {
        if (!!editProfile) {
            // Set state to be not editing profile
            setEditProfile(null);
            setTagBuffer(null);
        }
        else {
            // Set state to be editing profile
            setEditProfile({ ...user });
            setTagBuffer(user.tags); // Create a tag buffer in case
                                     // user adds/removes tags
        }
    }

    /**
     * Function to handle when the user clicks the github button
     * @returns {void} - This function does not return anything
     */
    const onGithubClicked = () => {
        window.open(user.github);
    }

    /**
     * Function to hanle when a user clicks the linkedin button
     * @returns {void} - This function does not return anything
     */
    const onLinkedInClicked = () => {
        window.open(user.linkedin);
    }

    /**
     * Function to handle when a user submits the edit profile form
     * @returns {void} - This function does not return anything
     */
    const onUpdateProfile = () => {
        if (!editProfile) return;
        const _validate = validateProfile(editProfile);
        if (!_validate.isValid) {
            setProfileInvalid(_validate.results);
        }
        else {
            updateProfile({ ...editProfile, tags: tagBuffer }, user.id).then((res) => {
                showSuccessMessage('Profile Updated');
                dispatch(updateUser(res.data));
                setEditProfile(null);
                setProfileInvalid([]);
                setTagBuffer(null);
            })
        }
    }

    /**
     * Function to handle removing a tag from the tag buffer.
     * This stages it to be deleted if a user submits the edit profile 
     * form.
     * @param {string} tag - Tag to remove 
     * @returns {void} - This function does not return anything
     */
    const onDeleteTag = tag => {
        setTagBuffer(tagBuffer.filter(x => x !== tag));
    }

    /**
     * This stages it to be added if a user submits the edit profile 
     * form.
     * @returns {void} - This function does not return anything
     */
    const onAddTag = () => {
        setTagBuffer([...tagBuffer, newTag]);
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
                    <div className={classNames(classes.topPortion, 'bottom-margin')}>
                        <Typography variant="h1" className={classNames(!readOnly ? classes.headerText : {}, 'margin-bottom')}>{user.name}'s Space</Typography>
                        <div className={classes.tags}>
                            {!readOnly &&
                                <div className='grow'>
                                    <div className={classes.editButton} onClick={editProfileClicked}>
                                        <EditIcon style={{ height: 12, width: 12, marginRight: 5 }} />
                                        <Typography variant="body2">Edit Profile Details</Typography>
                                    </div>
                                </div>
                            }
                            {!tagBuffer && user.tags.map(x => (
                                <Tag key={x.length + (Math.random() * 100)} content={x} />
                            ))}
                            {tagBuffer && tagBuffer.length < 6 &&
                                <React.Fragment>
                                    <TextField style={{ width: 100 }} label="" defaultValue='' placeholder='new tag'
                                        onChange={(event) => {
                                            setNewTag(event.target.value);
                                        }} />
                                    <IconButton onClick={onAddTag}><AddIcon style={{ width: 30, height: 30 }} /></IconButton>
                                </React.Fragment>
                            }
                            {tagBuffer && tagBuffer.map(x => (
                                <Tag content={x} readOnly={!editProfile} key={x.length + (Math.random() * 100)} onDelete={tag => onDeleteTag(tag)} />

                            ))}
                        </div>
                    </div>
                    <div className={classNames(classes.infoContainer)}>
                        <div className={classNames(classes.imageContainer)}>
                            <img src={user.profileImage} width="320px" height="320px" alt="test" />
                        </div>
                        <div className={classNames(classes.generalInfoContainer)}>
                            {editProfile &&
                                <div className='full-width'>
                                    <div className={classes.inputs}>
                                        <TextField error={isInvalid('title', profileInvalid)} variant="outlined" label="Job Title" defaultValue={user.title} placeholder="title"
                                            helperText={isInvalid('title', profileInvalid) ? 'Required. Must be less than or equal to 80 characters.' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, title: event.target.value });
                                            }} />
                                        <TextField error={isInvalid('company', profileInvalid)} variant="outlined" label="Company Title" defaultValue={user.company} placeholder="title"
                                            helperText={isInvalid('company', profileInvalid) ? '' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, company: event.target.value });
                                            }} />
                                        <TextField error={isInvalid('email', profileInvalid)} variant="outlined" label="User Email" defaultValue={user.email} placeholder="title"
                                            helperText={isInvalid('email', profileInvalid) ? 'Required. Must be a valid email.' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, email: event.target.value });
                                            }} />
                                        <TextField error={isInvalid('summary', profileInvalid)} variant="outlined" label="Summary" defaultValue={user.summary} placeholder="title"
                                            helperText={isInvalid('summary', profileInvalid) ? 'Required. Must be less than 250 characers' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, summary: event.target.value });
                                            }} />
                                        <TextField error={isInvalid('github', profileInvalid)} variant="outlined" label="Github" defaultValue={user.github} placeholder="url"
                                            helperText={isInvalid('github', profileInvalid) ? 'Must be a valid url.' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, github: event.target.value });
                                            }} />
                                        <TextField error={isInvalid('linkedin', profileInvalid)} variant="outlined" label="LinkedIn" defaultValue={user.linkedin} placeholder="url"
                                            helperText={isInvalid('linkedin', profileInvalid) ? 'Must be a valid url.' : ''} onChange={(event) => {
                                                setEditProfile({ ...editProfile, linkedin: event.target.value });
                                            }} />
                                    </div>
                                    <div className='flex'>
                                        <DefaultButton onClick={onUpdateProfile}>Update</DefaultButton>
                                        <DefaultButton warn={true} onClick={() => {
                                            setEditProfile(null);
                                            setProfileInvalid([]);
                                            setTagBuffer(null);
                                        }}>Cancel</DefaultButton>
                                    </div>
                                </div>

                            }
                            {!editProfile &&
                                <div>
                                    <Typography variant="h2" className={classNames(classes.infoItem)}>{user.title}</Typography>
                                    <Typography variant="h3" className={classNames(classes.infoItem, classes.company)}>{user.company}</Typography>
                                    <Typography variant="h3" className={classNames(classes.infoItem)}>Contact: {user.email}</Typography>
                                    <Typography variant="h2" className={classNames(classes.infoItem, classes.summary)}>"{user.summary}"</Typography>
                                    <div className={classes.socialButtons}>
                                        <DefaultButton onClick={onGithubClicked}>Github</DefaultButton>
                                        <DefaultButton onClick={onLinkedInClicked}>LinkedIn</DefaultButton>
                                    </div>
                                </div>
                            }
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

Space.propTypes = {
    classes: object.isRequired,
    user: object.isRequired,
    readOnly: bool
};

Space.defaultProps = {
    readOnly: false
};

export default withStyles(styles)(Space);
