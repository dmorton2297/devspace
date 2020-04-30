import React, { useState } from 'react'
import { object, bool, func, string } from 'prop-types';
import { editUserProject } from '../../../services/webService';
import { Typography, TextField, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BaseModal from '../base-modal';
import styles from './styles';
import { withStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../actions/projectsActions';
import { resetState } from '../../../utils/resetState';
import { isInvalid, validateProject } from '../../../utils/validator';



const EditProjectModal = ({ classes, open, onClose, project, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {
    
    const [invalid, setInvalid] = useState([]);
    const dispatch = useDispatch();
    
    const [state, setState] = useState({
        id: project ? project.id : '',
        name: project ? project.name : '',
        description: project ? project.description : '',
        github: project ? project.github : '',
        images: [],
        projectLink: '',
        website: '',
        tags: project ? project.tags.join(',') : '',
        demoVideo: '',
    });

    const submit = () => {
        const _validate = validateProject(state);
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([]);
            editUserProject({ ...state, tags: state.tags.split(',') }, currUser.id).then((res) => {
                dispatch(updateProject(res.data));
                onClose();
                showSuccess('Project Updated');
            })
        }
        
    };

    if (!project) {
        return <div></div>;
    }

    return (
        <BaseModal
            open={open}
            onClose={() => { resetState(state, setState, setInvalid); onClose() }}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText="edit"
            buttonFunc={submit}
            cancelButton={true}>
            <div className={classes.section}>
                <Typography varisant="h1">Edit Project</Typography>
            </div>

            <div className={classes.section}>
                <Typography variant="h1">General Information</Typography>
                <TextField error={isInvalid('name', invalid)} variant="outlined" label="Name" defaultValue={project.name} placeholder="name"
                    helperText={isInvalid('name', invalid) ? 'Required. Must be less than 50 characters.' : ''} onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                    }} />
                <TextField error={isInvalid('description', invalid)} variant="outlined" label="Description" defaultValue={project.description} placeholder="Description"
                    helperText={isInvalid('description', invalid) ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, description: event.target.value });
                    }} />
                <TextField error={isInvalid('github', invalid)} variant="outlined" label="Github URL" defaultValue={project.github} placeholder="URL"
                    helperText={isInvalid('github', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, github: event.target.value });
                    }} />
                <TextField error={isInvalid('website', invalid)} variant="outlined" label="Website" defaultValue={project ? project.website : ''} placeholder="URL"
                    helperText={isInvalid('website', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, website: event.target.value });
                    }} />
                <TextField error={isInvalid('projectLink', invalid)} variant="outlined" label="Deployed Project URL" defaultValue={project ? project.projectLink : ''} placeholder="URL"
                    helperText={isInvalid('projectLink', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, projectLink: event.target.value });
                    }} />
                <TextField error={isInvalid('tags', invalid)} variant="outlined" label="Tags" defaultValue={project.tags.join(',')} placeholder="comma,seperate,tags"
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
                <TextField error={isInvalid('demoVideo', invalid)} variant="outlined" label="Video Demo URL" defaultValue={project ? project.projectLink : ''} placeholder="URL"
                    helperText={isInvalid('demoVideo', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, demoVideo: event.target.value });
                    }} />
            </div>
        </BaseModal >
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
    showSuccess: () => {}
}

export default withStyles(styles)(EditProjectModal);
