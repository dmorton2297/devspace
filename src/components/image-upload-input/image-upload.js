import { Button, CircularProgress, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { removeImage, uploadImage } from '../../services/imageStorageService';
import styles from './styles';
import CloseIcon from '@material-ui/icons/Close';

const ImageUpload = ({ classes, onImageChanged, existingImages, singleImage }) => {
    const user = useSelector(state => state.userReducer);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [images, setImages] = useState(existingImages ? existingImages : null);

    const imageChanged = async (image) => {
        setUploadingImage(true);
        const response = await uploadImage(image, user._id);
        setImages([...(images ? images : []), response]);
        onImageChanged([...(images ? images : []), response]);
        setUploadingImage(false);
    }

    const onRemoveImage = async (image) => {
        await removeImage(user._id, image.id);
        setImages(images.filter(i => i.id !== image.id));
        onImageChanged(images.filter(i => i.id !== image.id));
    }

    return (
        <React.Fragment>
            <Typography variant='h1' className='bottom-margin'>Add Project Images</Typography>
            <Typography variant='h2' className='bottom-margin'>.PNG, .JPEG, .GIF allowed</Typography>
            {images && images.map((image, i) => (
                <div className={classes.imageRow} key={i}>
                    <img src={image.url} alt='test' width='95%' height='500px' style={{ objectFit: 'contain' }} />
                    <div className={classes.iconContainer}>
                        <IconButton styles={{ color: 'white' }} onClick={() => onRemoveImage(image)}><CloseIcon /></IconButton>
                    </div>

                </div>
            ))}
            {!uploadingImage && (!singleImage || (singleImage && images.length === 0)) && <Button
                className={classes.addImageButton}
                variant="contained"
                component="label">
                Add Image
                    <input type="file" style={{ display: 'none' }} onChange={event => {
                    event.preventDefault();
                    imageChanged(event.target.files[0]);
                }} />
            </Button>}
            {uploadingImage &&
                <CircularProgress />
            }
        </React.Fragment>
    );
}

export default withStyles(styles)(ImageUpload);

