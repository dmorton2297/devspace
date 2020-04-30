import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object, bool, func, string } from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import BaseModal from '../base-modal';
import { createUserProject } from '../../../services/webService';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../actions/projectsActions';
import { validateProject } from '../../../utils/validator';
import { resetState } from '../../../utils/resetState';
import ProjectForm from '../../forms/project-form';


const AddProjectModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState([]);
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

    const submit = () => {
        const _validate = validateProject(state);
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([]);
            setLoading(true);
            createUserProject({ ...state, tags: state.tags.split(',') }, currUser.id).then((res) => {
                setLoading(false);
                dispatch(addProject(res.data));
                onClose();
                showSuccess('Project Created Successfully!');
            })
        }
    };

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
