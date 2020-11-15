import React, { useState } from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles';
import { object, bool, func, string } from 'prop-types';
import BaseModal from '../base-modal';
import { createBlogPost } from '../../../services/webService';
import { validateBlogPost } from '../../../utils/validator';
import { resetState } from '../../../utils/resetState';
import { useDispatch } from 'react-redux';
import { addBlogPost } from '../../../actions/blogActions';
import BlogPostForm from '../../forms/blog-post-form';

const CreateBlogModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, currUser, showSuccess, blogId }) => {

    // Step Constants
    const STEPS = {
        general: 'General',
        content: 'Content'
    }

    // Redux Hooks
    const dispatch = useDispatch();

    // State Hooks
    const [step, setStep] = useState(STEPS.general);
    const [invalid, setInvalid] = useState([]);
    const [state, setState] = useState({
        title: '',
        description: '',
        image: null,
        tags: '',
        text: ''
    });


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
