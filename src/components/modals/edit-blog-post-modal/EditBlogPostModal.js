import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import BaseModal from '../base-modal';
import { object, bool, func, string } from 'prop-types';
import { resetState } from '../../../utils/resetState';
import { validateBlogPost, isInvalid } from '../../../utils/validator';
import { Typography, TextField } from '@material-ui/core';
import { editBlogPost } from '../../../services/webService';
import { useDispatch } from 'react-redux';
import { updateBlogPost } from '../../../actions/blogActions';
import ImageUpload from '../../image-upload-input';


const EditBlogPostModal = ({ classes, open, onClose, blog, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {

    const STEPS = {
        general: 'General',
        content: 'Content'
    }
    const dispatch = useDispatch();
    const [state, setState] = useState({
        id: `${blog._id}`,
        title: blog.title,
        description: blog.description,
        image: blog.image,
        tags: blog.tags.join(','),
        text: blog.text
    });
    const [step, setStep] = useState(STEPS.general);
    const [invalid, setInvalid] = useState([]);


    const onSubmit = () => {
        const _validate = validateBlogPost(state);
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([])
            editBlogPost({ ...state, tags: state.tags.split(',') }, currUser._id).then(res => {
                dispatch(updateBlogPost(res.data));
                onClose();
            });
        }
    }

    const imageChanged = async (images) => {
        setState({ ...state, image: images.length > 0 ? images[0] : null });
    }

    return (
        <BaseModal
            open={open}
            onClose={() => { resetState(state, setState); onClose() }}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText="create"
            buttonFunc={onSubmit}
            cancelButton={true}
            stepButton={{
                text: step === STEPS.content ? 'Previous' : 'Next',
                action: step === STEPS.content ? () => setStep(STEPS.general) : () => setStep(STEPS.content)
            }}
            showButton={step === STEPS.content}>
            <Typography variant="h2">Create Post</Typography>
            {step === STEPS.general &&
                <div className={classes.generalInfoForm}>
                    <Typography className='margin-bottom' variant="h1">Let's get some general info ...</Typography>
                    <div className='form-section'>
                        <TextField error={isInvalid('title', invalid)} variant="outlined" label="Blog Title" defaultValue={state.title} placeholder="Name"
                            helperText={isInvalid('title', invalid) ? 'Required. Must be less than 60 characters.' : ''} onChange={(event) => {
                                setState({ ...state, title: event.target.value })
                            }} />
                        <TextField error={isInvalid('description', invalid)} variant="outlined" label="Blog Description" multiline rows={3} defaultValue={state.description} placeholder="Description"
                            helperText={isInvalid('description', invalid) ? 'Required.' : ''} onChange={(event) => {
                                setState({ ...state, description: event.target.value })

                            }} />
                        <TextField error={isInvalid('tags', invalid)} variant="outlined" label="Blog Tags" defaultValue={state.tags} placeholder="tag,tag,tag"
                            helperText={isInvalid('tags', invalid) ? 'Must be a comma seperated list' : ''} onChange={(event) => {
                                setState({ ...state, tags: event.target.value })
                            }} />
                    </div>
                    <div className='form-section'>
                        <ImageUpload onImageChanged={imageChanged} existingImages={[state.image]} />

                    </div>
                </div>

            }
            {step === STEPS.content &&
                <TextField error={isInvalid('text', invalid)} variant="outlined" label="Text" defaultValue={state.text} placeholder="Markdown"
                    helperText={isInvalid('text', invalid) ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, text: event.target.value })
                    }} multiline rows={55} />
            }

        </BaseModal>
    );
};

EditBlogPostModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    blog: object.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedby: string,
    showSuccess: func
};


export default withStyles(styles)(EditBlogPostModal);
