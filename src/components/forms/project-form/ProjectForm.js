import React from 'react'
import { withStyles, Typography, TextField, IconButton, Button } from '@material-ui/core';
import styles from './styles';
import { isInvalid } from '../../../utils/validator';
import CloseIcon from '@material-ui/icons/Close';
import { object, func, arrayOf, string } from 'prop-types';

/**
 * Add project form element.
 * @param {object} $0 - Object containing props for this component
 * @param {object} $0.classes - object containing styling for this component
 * @param {object} $0.state - state object form values are mapped to
 * @param {function} $0.setState - function to set state
 * @param {string[]} $0.invalid - invalid fields
 * @param {string} $0.action - action verb for this form
 * @return {element} - the add project form
 */
const ProjectForm = ({ classes, state, setState, invalid, action }) => {
    return (
        <React.Fragment>
            <div className='form-section'>
                <Typography varisant="h1">{action} Project</Typography>
            </div>

            <div className='form-section'>
                <Typography variant="h1">General Information</Typography>
                <TextField error={isInvalid('name', invalid)} variant="outlined" label="Name" defaultValue={state.name} placeholder="name"
                    helperText={isInvalid('name', invalid) ? 'Required. Must be less than 40 characters' : ''} onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                    }} />
                <TextField error={isInvalid('description', invalid)} variant="outlined" label="Description" defaultValue={state.description} placeholder="Description"
                    helperText={isInvalid('description', invalid) ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, description: event.target.value });
                    }} />
                <TextField error={isInvalid('github', invalid)} variant="outlined" label="Github URL" defaultValue={state.github} placeholder="URL"
                    helperText={isInvalid('github', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, github: event.target.value });
                    }} />
                <TextField error={isInvalid('website', invalid)} variant="outlined" label="Website" defaultValue={state.website} placeholder="URL"
                    helperText={isInvalid('website', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, website: event.target.value });
                    }} />
                <TextField error={isInvalid('projectLink', invalid)} variant="outlined" label="Deployed Project URL" defaultValue={state.projectLink} placeholder="URL"
                    helperText={isInvalid('projectLink', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, projectLink: event.target.value });
                    }} />
                <TextField error={isInvalid('tags', invalid)} variant="outlined" label="Tags" defaultValue={state.tags} placeholder="comma,seperate,tags"
                    helperText={isInvalid('tags', invalid) ? 'Must be a comma seperated list' : ''} onChange={(event) => {
                        setState({ ...state, tags: event.target.value });
                    }} />
            </div>

            <div className='form-section'>
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

            <div className='form-section'>
                <Typography variant='h1'>Video Demo Details</Typography>
                <TextField error={isInvalid('demoVideo', invalid)} variant="outlined" label="Video Demo URL" defaultValue={state.demoVideo} placeholder="URL"
                    helperText={isInvalid('demoVideo', invalid) ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, demoVideo: event.target.value });
                    }} />
            </div>
        </React.Fragment>
    );
};

ProjectForm.propTypes = {
    classes: object.isRequired,
    setState: func.isRequired,
    state: object.isRequired,
    invalid: arrayOf(string).isRequired,
    action: string.isRequired
}

export default withStyles(styles)(ProjectForm);
