import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/styles';
import styles from './styles';
import { Card, Typography, IconButton } from '@material-ui/core';
import { object, func } from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import EditProjectModal from '../modals/edit-project-modal/EditProjectModal';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteProjectModal from '../modals/delete-project-modal';

const ProjectCard = ({ project, classes, onClick, showSuccess }) => {

    const user = useSelector(state => state.userReducer);
    const [editProject, setEditProject] = useState(null);
    const [deleteProject, setDeleteProject] = useState(null);

    const useStyles = makeStyles({
        projImage: {
            height: 400,
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("${project.image}")`
        }
    });

    const editProjectModal = (project) => {
        setEditProject(project);
    }

    const deleteProjectModal = (project) => {
        setDeleteProject(project);
    }

    const imageClasses = useStyles();
    return (
        <React.Fragment>
            <EditProjectModal showSuccess={showSuccess} open={!!editProject} project={project} currUser={user} onClose={() => setEditProject(null)} ariaDsescribedBy='Edit Project' ariaLabelledBy='Edit Project' />
            <DeleteProjectModal showSuccess={showSuccess} open={!!deleteProject} project={project} currUser={user} onClose={() => setDeleteProject(null)} ariaDsescribedBy='Delete Project' ariaLabelledBy='Delete Project' />
            <Card className={classes.container}>
                <div className={classNames(classes.header, 'flex')}>
                    <Typography className={classes.projectName} variant="h2">{project.name}</Typography>
                    <IconButton className={classes.controlButton} onClick={() => editProjectModal(project)}><EditIcon /></IconButton>
                    <IconButton className={classNames(classes.controlButton, classes.deleteButton)} onClick={() => deleteProjectModal(project)}><DeleteIcon /></IconButton>
                </div>
                <div className={imageClasses.projImage} onClick={() => onClick(project.id)}></div>
            </Card>
        </React.Fragment>

    );
};

ProjectCard.propTypes = {
    project: object.isRequired,
    classes: object.isRequired,
    onClick: func.isRequired,
    showSuccess: func.isRequired

}

export default withStyles(styles)(ProjectCard);
