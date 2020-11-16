import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { isInvalid } from '../../../utils/validator';
import ImageUpload from '../../image-upload-input';

const BlogPostForm = ({ state, setState, step, invalid, action }) => {

    const STEPS = {
        general: 'General',
        content: 'Content'
    };

    const imageChanged = async (images) => {
        setState({ ...state, image: images.length > 0 ? images[0] : null });
    }

    return (
        <React.Fragment>
            <Typography variant="h2">{action} Post</Typography>
            {step === STEPS.general &&
                <React.Fragment>
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
                        <ImageUpload onImageChanged={imageChanged} existingImages={state.image ? [state.image] : null} />
                    </div>
                </React.Fragment>

            }
            {step === STEPS.content &&
                <TextField error={isInvalid('text', invalid)} variant="outlined" label="Text" defaultValue={state.text} placeholder="Markdown"
                    helperText={isInvalid('text', invalid) ? 'Required' : ''} onChange={(event) => {
                        setState({ ...state, text: event.target.value })
                    }} multiline rows={55} />
            }
        </React.Fragment>
    )
}

export default BlogPostForm;
