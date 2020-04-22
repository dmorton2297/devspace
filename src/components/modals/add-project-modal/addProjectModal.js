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


const AddProjectModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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

    const [invalid, setInvalid] = useState([]);

    const resetState = () => {
        setState({
            name: '',
            description: '',
            github: '',
            images: [],
            projectLink: '',
            website: '',
            tags: '',
            demoVideo: '',
        });
        setInvalid([]);
    }

    const isInvalid = label => {
        if (invalid.find(x => x === label)) {
            return true;
        }
        return false;
    }

    const validate = () => {
        const validURL = (str) => {
            const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(str);
        }

        const validation = {
            name: true, description: true,
            github: true, website: true,
            projectLink: true, tags: true,
            demoVideo: true
        };
        if (state.name === '' || state.name.length > 50) validation.name = false;
        if (state.description === '') validation.description = false;
        if (state.github !== '' && !validURL(state.github)) validation.github = false;
        if (state.website !== '' && !validURL(state.website)) validation.website = false;
        if (state.demoVideo !== '' && !validURL(state.demoVideo)) validation.demoVideo = false;
        if (state.projectLink !== '' && !validURL(state.website)) validation.projectLink = false;
        if (state.tags !== '') {
            const val = state.tags.split(',');
            val.forEach(x => {
                if (!x || x.length === 0) {
                    validation.tags = false;
                    return;
                }
            });
        };


        const results = Object.keys(validation).filter(x => !validation[x]);
        return { isValid: results.length === 0, results }
    }

    const submit = () => {
        const _validate = validate();
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([]);
            setLoading(true);
            createUserProject({...state, tags: state.tags.split(',')}, currUser.id).then((res) => {
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
            onClose={() => { resetState(); onClose() }}
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
                <TextField error={isInvalid('name')} variant="outlined" label="Name" defaultValue='' placeholder="name"
                    helperText={isInvalid('name') ? 'Required. Must be less than 50 characters' : ''} onChange={(event) => {
                        setState({ ...state, name: event.target.value });
                    }} />
                <TextField error={isInvalid('description')} variant="outlined" label="Description" defaultValue='' placeholder="Description"
                    helperText={isInvalid('description') ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, description: event.target.value });
                    }} />
                <TextField error={isInvalid('github')} variant="outlined" label="Github URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('github') ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, github: event.target.value });
                    }} />
                <TextField error={isInvalid('website')} variant="outlined" label="Website" defaultValue='' placeholder="URL"
                    helperText={isInvalid('website') ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, website: event.target.value });
                    }} />
                <TextField error={isInvalid('projectLink')} variant="outlined" label="Deployed Project URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('projectLink') ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, projectLink: event.target.value });
                    }} />
                <TextField error={isInvalid('tags')} variant="outlined" label="Tags" defaultValue='' placeholder="comma,seperate,tags"
                    helperText={isInvalid('tags') ? 'Must be a comma seperated list' : ''} onChange={(event) => {
                        setState({ ...state, tags: event.target.value });
                    }} />
            </div>

            <div className={classes.section}>
                <Typography variant='h1' className='bottom-margin'>Add Project Images</Typography>
                <Typography variant='h2' className='bottom-margin'>.PNG, .JPEG, .GIF allowed</Typography>
                {state.images.map(image => (
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
                <TextField error={isInvalid('demoVideo')} variant="outlined" label="Video Demo URL" defaultValue='' placeholder="URL"
                    helperText={isInvalid('demoVideo') ? 'Must be a URL' : ''} onChange={(event) => {
                        setState({ ...state, demoVideo: event.target.value });
                    }} />
            </div>
        </BaseModal >
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
