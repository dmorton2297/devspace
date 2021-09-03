import React from 'react'
import { bool, func, string, object } from 'prop-types';
import BaseModal from '../base-modal';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../../actions/projectsActions';
import { deleteUserProject } from '../../../../services/webService';

const DeleteProjectModal = ({ classes, currUser, open, onClose, ariaLabelledBy, ariaDescribedby, project, showSuccess }) => {

    const dispatch = useDispatch();

    const onDelete = () => { 
        deleteUserProject(project, 1).then(res => {
            dispatch(deleteProject(res.data));
            onClose();
            showSuccess('Successfully Deleted Project');
        });
    }

    if (!project) return <div></div>;
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText='Delete'
            buttonFunc={onDelete}
            cancelButton={true}>
            <div className={classNames(classes.container, 'flex-vert')}>
                <WarningIcon className={classes.warning} />
                <Typography variant="h1" className='bottom-margin'>Are you sure you want to delete ?</Typography>
                <Typography variant="h2" className='bottom-margin'>Project about to be deleted: <strong>{project.name}</strong></Typography>
                <Typography variant="h3" className='bottom-margin'>This action cannot be reversed.</Typography>
            </div>
        </BaseModal>
    );
};

DeleteProjectModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    project: object,
    ariaLabelledBy: string,
    ariaDescribedby: string,
    showSuccess: func
};

DeleteProjectModal.defaultProps = {
    showSuccess: () => {}
};
export default withStyles(styles)(DeleteProjectModal);
