import React, { useState } from 'react'
import { object, bool, func, string } from 'prop-types';
import { editUserProject } from '../../../services/webService';
import BaseModal from '../base-modal';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../actions/projectsActions';
import { resetState } from '../../../utils/resetState';
import { validateProject } from '../../../utils/validator';
import ProjectForm from '../../forms/project-form';


/**
 * Edit project modal component.
 * @param {object} $0 - Object containing props for this component
 * @param {boolean} $0.open - Specifies if modal is open
 * @param {function} $0.onCLose - Function handler for closing the modal
 * @param {string} $0.ariaLabelledBy - aria-labelled-by
 * @param {string} $0.ariaDescribedby - aria-described-by
 * @param {object} $0.currUser - current user of the applicatoin
 * @param {function} $0.showSuccess - function to handle a successful state (optional)
 * @param {object} $0.project - project object we want to edit
 * @returns {element} - The edit project modal
 */
const EditProjectModal = ({ open, onClose, project, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {

    const [invalid, setInvalid] = useState([]); // track which form fields are invalid
    const dispatch = useDispatch();

    // each state property maps to a form value
    const [state, setState] = useState({
        id: project ? project._id : '',
        name: project ? project.name : '',
        description: project ? project.description : '',
        github: project ? project.github : '',
        images: [],
        projectLink: '',
        website: '',
        tags: project.tags ? project.tags.join(',') : '',
        demoVideo: '',
    });

    /**
     * Function to handle when the Edit Project form is submitted
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
            
            // call the API to update the project
            editUserProject({ ...state, tags: state.tags.split(',') }, currUser._id).then((res) => {
                dispatch(updateProject(res.data));
                onClose();
                showSuccess('Project Updated');
            })
        }

    };

   // If we don't have a project, don't render anything.
    if (!project) {
        return <React.Fragment></React.Fragment>;
    }

    // render
    return (
        <BaseModal
            open={open}
            onClose={() => { resetState(state, setState, setInvalid); onClose() }}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText="edit"
            buttonFunc={submit}
            cancelButton={true}>
            <ProjectForm state={state} setState={setState} invalid={invalid} action='Edit' />
        </BaseModal>
    );
};

EditProjectModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    project: object.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedby: string,
    showSuccess: func
};

EditProjectModal.defaultProps = {
    showSuccess: () => { }
}

export default withStyles(styles)(EditProjectModal);
