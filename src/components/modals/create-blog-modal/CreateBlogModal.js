import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import { object, bool, func, string } from 'prop-types';
import BaseModal from '../base-modal';
import { Typography, TextField } from '@material-ui/core';
import { createBlogPost } from '../../../services/webService';
import { validateBlogPost, isInvalid } from '../../../utils/validator';
import { resetState } from '../../../utils/resetState';
import { useDispatch } from 'react-redux';
import { addBlogPost } from '../../../actions/blogActions';
import ImageUpload from '../../image-upload-input';
import BlogPostForm from '../../forms/blog-post-form';

const CreateBlogModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, currUser, showSuccess, blogId }) => {

    const STEPS = {
        general: 'General',
        content: 'Content'
    }
    const [step, setStep] = useState(STEPS.general);
    const [invalid, setInvalid] = useState([]);
    const [state, setState] = useState({
        title: '',
        description: '',
        image: null,
        tags: '',
        text: ''
    });

    const dispatch = useDispatch();

    const onSubmit = () => {
        const _validate = validateBlogPost(state);
        if (!_validate.isValid) {
            setInvalid(_validate.results);
        }
        else {
            setInvalid([])
            createBlogPost({ ...state, tags: state.tags.split(','), blogId }, currUser._id).then((res) => {
                resetState(state, setState, setInvalid);
                dispatch(addBlogPost(res.data));
                onClose();

            });

        }
    }

    const stateChanged = (state) => {
        setState(state);
    }

    const imageChanged = async (images) => {
        setState({ ...state, image: images.length > 0 ? images[0] : null });
    }

    return (
        <BaseModal
            open={open}
            onClose={onClose}
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
            <BlogPostForm
                state={state}
                setState={stateChanged}
                step={step}
                invalid={invalid}
                action="Create"
            />

        </BaseModal>
    )
}

CreateBlogModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedby: string,
    showSuccess: func.isRequired,
    blogId: string.isRequired
}

export default withStyles(styles)(CreateBlogModal)
