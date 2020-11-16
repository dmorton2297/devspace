import React, { useState } from 'react'
import { withStyles, Typography, Card, makeStyles, IconButton } from '@material-ui/core';
import styles from './styles';
import { object, bool } from 'prop-types';
import classNames from 'classnames';
import Tag from '../shared/tag';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVert from '@material-ui/icons/MoreVert';
import moment from 'moment';
import EditBlogPostModal from '../modals/edit-blog-post-modal';
import DeleteBlogPostModal from '../modals/delete-blog-post-modal/DeleteBlogPostModal';
import { getUserBlogs } from '../../services/webService';
import { useDispatch } from 'react-redux';
import { setBlog } from '../../actions/blogActions';

const BlogPost = ({ classes, post, history, user, readOnly }) => {

    const [showControls, setShowControls] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const dispatch = useDispatch();

    const useStyles = makeStyles({
        projImage: {
            height: 300,
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("${post.image.url}")`
        }
    });

    const triggerRefresh = () => {
        getUserBlogs(user._id).then((res) => {
            dispatch(setBlog(res.data));
        })
    }

    const onEditClicked = () => {
        setShowEdit(true);
    };

    const onDeleteClicked = () => {
        setShowDelete(true);
    }

    const onEditClosed = () => {
        triggerRefresh();
        setShowEdit(false);
        setShowControls(false);
    }

    const onDeleteClosed = () => {
        triggerRefresh();
        setShowDelete(false);
    };


    const postImage = useStyles();
    return (
        <Card className={classNames(classes.container, 'full-width')}>
            <EditBlogPostModal open={showEdit} onClose={onEditClosed} blog={post}
                ariaLabelledBy='Edit' ariaDescribedby='Edit' currUser={user} />
            <DeleteBlogPostModal open={showDelete} onClose={onDeleteClosed} post={post}
                ariaDescribedby='Delete' ariaLabelledBy='Delete' currUser={user} />
            <div className={classes.infoContainer}>
                <div onClick={() => history.push(`/posts/${post._id}`)} className={classes.generalInfo}>
                    <Typography className={classNames(classes.title)} variant='h2'>{post.title}</Typography>
                    <Typography className={classNames(classes.description)} variant="h2">{post.description}</Typography>
                    <div className={classes.createdAtContainer}>
                        <Typography className={classNames(classes.createdAt)} variant="h3">{`Created on ${moment(post.createdAt).format("MM/DD/YYYY hh:mm A")}`}</Typography>
                    </div>
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
            <div className={postImage.projImage} onClick={() => history.push(`/posts/${post._id}`)}>
                <div className={classNames(classes.tagContainer, 'flex')}>
                    {post.tags?.map((tag, i) => (
                        <Tag content={tag} key={i} />
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
