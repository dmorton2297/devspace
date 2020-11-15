import React from 'react'
import { bool, func, string, object } from 'prop-types';
import { Typography } from '@material-ui/core';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import BaseModal from '../base-modal';


const ProjectModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, project }) => {
    if (!project) return <div></div>;
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText='close'
            buttonFunc={onClose}>
            <Typography variant="h1" className='modal-header'>{project.name}</Typography>
            <Typography variant="h2" className={classes.header}>{project.description}{project.description}{project.description}</Typography>
            <div className={classes.imageContainer}>
                <img src={project.image.url} className={classes.projectImage} alt='project' />
            </div>
        </BaseModal>
    );
};

ProjectModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    project: object,
    ariaLabelledBy: string,
    ariaDescribedby: string
}

export default withStyles(styles)(ProjectModal);
