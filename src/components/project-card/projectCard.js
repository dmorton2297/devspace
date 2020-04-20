import React, { useState } from 'react'
import { withStyles, makeStyles } from '@material-ui/styles';
import styles from './styles';
import { Card, Typography, IconButton } from '@material-ui/core';
import { object, func } from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import EditProjectModal from '../modals/edit-project-modal/editProjectModal';
import { useSelector } from 'react-redux';

const ProjectCard = ({ project, classes, onClick }) => {

    const user = useSelector(state => state.userReducer);
    const [editProject, setEditProject] = useState(false);

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

    const imageClasses = useStyles();
    return (
        <React.Fragment>
            <EditProjectModal open={!!editProject} project={project} currUser={user} onClose={() => setEditProject(null)} ariaDsescribedBy='Edit Project' ariaLabelledBy='Edit Project' />
            <Card className={classes.container}>
                <div className={classNames(classes.header, 'flex')}>
                    <Typography className={classes.projectName} variant="h2">{project.name}</Typography>
                    <IconButton className={classes.editButton} onClick={() => editProjectModal(project)}><EditIcon /></IconButton>
                </div>
                <div className={imageClasses.projImage} onClick={() => onClick(project.id)}></div>
            </Card>
        </React.Fragment>

    );
};

ProjectCard.propTypes = {
    project: object.isRequired,
    classes: object.isRequired,
    onClick: func.isRequired

}

export default withStyles(styles)(ProjectCard);
