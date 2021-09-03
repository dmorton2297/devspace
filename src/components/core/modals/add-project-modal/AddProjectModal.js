import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object, bool, func, string } from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import BaseModal from '../base-modal';
import { createUserProject } from '../../../../services/webService';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../../actions/projectsActions';
import { validateProject } from '../../../../utils/validator';
import { resetState } from '../../../../utils/resetState';
import ProjectForm from '../../forms/project-form';

/**
 * Add project modal component.
 * @param {object} $0 - Object containing props for this component
 * @param {boolean} $0.open - Specifies if modal is open
 * @param {function} $0.onCLose - Function handler for closing the modal
 * @param {string} $0.ariaLabelledBy - aria-labelled-by
 * @param {string} $0.ariaDescribedby - aria-described-by
 * @param {object} $0.currUser - current user of the applicatoin
 * @param {function} $0.showSuccess - function to handle a successful state (optional)
 * @returns {element} - the add project modal
 */
const AddProjectModal = ({ open, onClose, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState([]);

    // each state property maps to a form value
    const [state, setState] = useState({
        name: '',
        description: '',
        github: '',
        images: [],
        projectLink: '',
        website: '',
        tags: '',
        demoVideo: '',
    });

    /**
     * Function to handle when the Add Project form is submitted
     * @returns {void} - this function does not return anything
     */
    const submit = () => {
        const _validate = validateProject(state); // validate the project
        if (!_validate.isValid) {
            setInvalid(_validate.results); // Set validation results if there was a fail. results will
                                           // contain an array of strings specifying invalid field names
        }
        else {
            setInvalid([]);
            setLoading(true);
            
            // call the API and update the object
            createUserProject({ ...state, tags: state.tags.split(',') }, currUser._id).then((res) => {
                setLoading(false);
                dispatch(addProject(res.data));
                onClose();
                showSuccess('Project Created Successfully!');
            })
        }
    };

    // render
    return (
        <BaseModal
            open={open}
            onClose={() => { resetState(state, setState, setInvalid); onClose() }}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText="create"
            buttonFunc={submit}
            cancelButton={true}>
            {loading &&
                <CircularProgress />
            }
            <ProjectForm state={state} setState={setState} invalid={invalid} action='Add' />
        </BaseModal>
    );
};

AddProjectModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedby: string,
    showSuccess: func.isRequired
}

export default withStyles(styles)(AddProjectModal);
