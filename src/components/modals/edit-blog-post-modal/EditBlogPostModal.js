import React, { useState } from 'react'
import BaseModal from '../base-modal';
import { object, bool, func, string } from 'prop-types';
import { resetState } from '../../../utils/resetState';
import { validateBlogPost } from '../../../utils/validator';
import { editBlogPost } from '../../../services/webService';
import { useDispatch } from 'react-redux';
import { updateBlogPost } from '../../../actions/blogActions';
import BlogPostForm from '../../forms/blog-post-form';


const EditBlogPostModal = ({ open, onClose, blog, ariaLabelledBy, ariaDescribedby, currUser, showSuccess }) => {

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

    const stateChanged = (state) => {
        setState(state);
    }

    return (
        <BaseModal
            open={open}
            onClose={() => { resetState(state, setState); onClose() }}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText="Update"
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
                action="Edit"
            />

        </BaseModal>
    );
};

EditBlogPostModal.propTypes = {
    open: bool.isRequired,
    blog: object.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedby: string,
    showSuccess: func
};


export default EditBlogPostModal;
