import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object, bool, func, string } from 'prop-types';
import { Typography, TextField, Button, IconButton, CircularProgress } from '@material-ui/core';
import BaseModal from '../base-modal';
import CloseIcon from '@material-ui/icons/Close';
import { createUserProject } from '../../../services/webService';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../actions/projectsActions';
import { validateProject, isInvalid } from '../../../utils/validator';
import { resetState } from '../../../utils/resetState';


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
            <div className={classes.section}>
                <Typography varisant="h1">Add Project</Typography>
            </div>

            <div className={classes.section}>
                <Typography variant="h1">General Information</Typography>
                <TextField error={isInvalid('name', invalid)} variant="outlined" label="Name" defaultValue='' placeholder="name"
                    helperText={isInvalid('name', invalid) ? 'Required. Must be less than 40 characters' : ''} onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                    }} />
                <TextField error={isInvalid('description', invalid)} variant="outlined" label="Description" defaultValue='' placeholder="Description"
                    helperText={isInvalid('description', invalid) ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, description: event.target.value });
                    }} />
                <TextField error={isInvalid('github', invalid)} variant="outlined" label="Github URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('github', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, github: event.target.value });
                    }} />
                <TextField error={isInvalid('website', invalid)} variant="outlined" label="Website" defaultValue='' placeholder="URL"
                    helperText={isInvalid('website', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, website: event.target.value });
                    }} />
                <TextField error={isInvalid('projectLink', invalid)} variant="outlined" label="Deployed Project URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('projectLink', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, projectLink: event.target.value });
                    }} />
                <TextField error={isInvalid('tags', invalid)} variant="outlined" label="Tags" defaultValue='' placeholder="comma,seperate,tags"
                    helperText={isInvalid('tags', invalid) ? 'Must be a comma seperated list' : ''} onChange={(event) => {
                        setState({ ...state, tags: event.target.value });
                    }} />
            </div>

            <div className={classes.section}>
                <Typography variant='h1' className='bottom-margin'>Add Project Images</Typography>
                <Typography variant='h2' className='bottom-margin'>.PNG, .JPEG, .GIF allowed</Typography>
                {state.images && state.images.map(image => (
                    <div className={classes.imageRow}>
                        <Typography varant="body2" className={classes.imageRowContent}>{image}</Typography>
                        <IconButton styles={{ color: 'white' }} onClick={() => setState({
                            ...state, images: state.images.filter(i => i !== image)
                        })}><CloseIcon /></IconButton>
                    </div>
                ))}
                <Button
                    className={classes.addImageButton}
                    variant="contained"
                    component="label">
                    Add Image
                    <input type="file" style={{ display: 'none' }} onChange={event => {
                        setState({ ...state, images: [...state.images, event.target.value] });
                    }} />
                </Button>
            </div>

            <div className={classes.section}>
                <Typography variant='h1'>Video Demo Details</Typography>
                <TextField error={isInvalid('demoVideo', invalid)} variant="outlined" label="Video Demo URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('demoVideo', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, demoVideo: event.target.value });
                    }} />
            </div>
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
