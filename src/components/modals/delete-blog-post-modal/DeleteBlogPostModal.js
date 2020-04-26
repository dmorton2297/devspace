import React from 'react'
import { withStyles } from '@material-ui/styles';
import { bool, func, string, object } from 'prop-types';
import styles from './styles';
import BaseModal from '../base-modal';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { deleteBlogPost } from '../../../services/webService';
import { useDispatch } from 'react-redux';
import { removeBlogPost } from '../../../actions/blogActions';


const DeleteBlogPostModal = ({ classes, currUser, open, onClose, ariaLabelledBy, ariaDescribedby, post, showSuccess }) => {
    
    const dispatch = useDispatch();

    const onDelete = () => {
        console.log('On delete clicked')
        console.log(post);
        console.log(currUser.id);
        deleteBlogPost(post, currUser.id).then((res) => {
            console.log(res);
            dispatch(removeBlogPost(res.data));
            onClose();
        });
    }
    
    return (
        <BaseModal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}
            buttonText='Delete'
            buttonFunc={onDelete}
            cancelButton={true}>
            <div className={classNames(classes.container, 'flex-vert')}>
                <WarningIcon className={classes.warning} />
                <Typography variant="h1" className='bottom-margin'>Are you sure you want to delete ?</Typography>
                <Typography variant="h2" className='bottom-margin'>Blog Post about to be deleted: <strong>{post.title}</strong></Typography>
                <Typography variant="h3" className='bottom-margin'>This action cannot be reversed.</Typography>
            </div>
        </BaseModal>
    )
};

DeleteBlogPostModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    post: object,
    ariaLabelledBy: string,
    ariaDescribedby: string,
    showSuccess: func
};

export default withStyles(styles)(DeleteBlogPostModal);
