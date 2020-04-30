import React, { useState } from 'react'
import { withStyles, Typography, Card, makeStyles, IconButton } from '@material-ui/core';
import styles from './styles';
import { object, bool } from 'prop-types';
import classNames from 'classnames';
import Tag from '../shared/tag';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import EditBlogPostModal from '../modals/edit-blog-post-modal';
import DeleteBlogPostModal from '../modals/delete-blog-post-modal/DeleteBlogPostModal';

const BlogPost = ({ classes, post, history, user, readOnly }) => {

    const [showControls, setShowControls] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editDetails] = useState({});

    const useStyles = makeStyles({
        projImage: {
            height: 300,
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("${post.image}")`
        }
    });

    const onEditClicked = () => {
        setShowEdit(true);
    };

    const onDeleteClicked = () => {
        setShowDelete(true);
    }


    const postImage = useStyles();
    console.log(editDetails);
    return (
        <Card className={classNames(classes.container, 'full-width')}>
            <EditBlogPostModal open={showEdit} onClose={() => setShowEdit(false)} blog={post}
                ariaLabelledBy='Edit' ariaDescribedby='Edit' currUser={user} />
            <DeleteBlogPostModal open={showDelete} onClose={() => setShowDelete(false)} post={post}
                ariaDescribedby='Delete' ariaLabelledBy='Delete' currUser={user} />
            <div className={classes.infoContainer}>
                <div onClick={() => history.push(`/posts/${post.id}/${user.id}`)}>
                    <Typography className={classNames(classes.title)} variant='h2'>{post.title}</Typography>
                    <hr style={{ color: 'white', margin: '0 30px 0 20px' }} />
                    <Typography className={classNames(classes.description)} variant="h2">{post.description}</Typography>
                </div>
                <div>
                    {!readOnly &&
                        <React.Fragment>
                            <IconButton className={classes.controlButton} onClick={() => setShowControls(!showControls)}><MoreVert className={classes.icon} /></IconButton>
                            <div className={classes.controls} hidden={!showControls}>
                                <IconButton className={classes.controlButton} onClick={onEditClicked}><EditIcon className={classes.icon} /></IconButton>
                                <IconButton className={classes.controlButton} onClick={onDeleteClicked}><DeleteIcon className={classes.icon} /></IconButton>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
            <div className={postImage.projImage}>
                <div className={classNames(classes.tagContainer, 'flex')}>
                    {post.tags.map(tag => (
                        <Tag content={tag} key={`${tag.length + (Math.random() * 1000)}`} />
                    ))}
                </div>
            </div>

        </Card>
    );
};

BlogPost.propTypes = {
    classes: object.isRequired,
    post: object.isRequired,
    history: object,
    user: object.isRequired,
    readOnly: bool
}

BlogPost.defaultProps = {
    readOnly: false
}

export default withStyles(styles)(BlogPost);
