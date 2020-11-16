import React, { useState } from 'react'
import { object, bool, func, string } from 'prop-types';
import BaseModal from '../base-modal';
import ImageUpload from '../../image-upload-input';
import { updateProfile } from '../../../services/webService';

const ProfilePhotoModal = ({ open, onClose, profileImage, ariaLabelledBy, ariaDescribedBy, currUser, showSuccess }) => {

    const [state, setState] = useState({
        profileImage: null,
    })

    const handleSubmit = () => {
        updateProfile({ currUser, profileImage: state.profileImage }, currUser._id).then((res) => {
            onClose();
        })
    }

    const handleImageChange = (images) => {
        if (images[0]) {
            setState({
                profileImage: images[0].url
            });
        } else {
            setState({
                profileImage: null
            })
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <BaseModal
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        buttonText="Change Image    "
        buttonFunc={handleSubmit}
        cancelButton={true}>
            <div className="form-section">
                <ImageUpload onImageChanged={handleImageChange} existingImages={state.profileImage ? [state.profileImage] : []} singleImage />
            </div>
        </BaseModal>
    )
}

ProfilePhotoModal.propTypes = {
    open: bool.isRequired,
    profileImage: string,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    currUser: object.isRequired,
    ariaDescribedBy: string,
    showSuccess: func,
}

ProfilePhotoModal.defaultProps = {
    profileImage: null,
    showSuccess: () => {},
}

export default ProfilePhotoModal;

