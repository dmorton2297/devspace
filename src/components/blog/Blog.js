import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { object, bool } from 'prop-types';

import React, { useEffect, useState } from 'react';
import styles from './styles';
import { Card, Typography, IconButton, TextField } from '@material-ui/core';
import { getUserBlogs, updateBlogDetails } from '../../services/webService';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog, setBlogDetails } from '../../actions/blogActions';
import Tag from '../shared/tag';
import { withRouter } from 'react-router-dom';
import BlogPost from '../blog-post/BlogPost';
import AddIcon from '@material-ui/icons/Add';
import CreateBlogModal from '../modals/create-blog-modal';
import EditIcon from '@material-ui/icons/Edit';
import DefaultButton from '../shared/default-button';

const Blog = ({ classes, user, history, readOnly, dataOverride }) => {

    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogReducer);
    const [createBlog, setCreateBlog] = useState(false);
    const [editDetails, setEditDetails] = useState(null);
    const [tagBuffer, setTagBuffer] = useState(null);
    const [newTag, setNewTag] = useState(null);

    useEffect(() => {
        if (dataOverride) {
            dispatch(setBlog(dataOverride));
        }
        else {
            getUserBlogs(user._id).then((res) => {
                dispatch(setBlog(res.data));
            })
        }

    }, [dispatch, user, dataOverride])

    const editBlogDetails = () => {
        if (editDetails) {
            setTagBuffer(null);
            setEditDetails(null);
        }
        else {
            setTagBuffer(blog.tags);
            setEditDetails({
                _id: blog._id,
                title: blog.title,
                description: blog.description,
                tags: blog.tags
            });
        }
    }

    const updateDetails = () => {
        updateBlogDetails({ ...editDetails, tags: tagBuffer }, user._id).then((res) => {
            dispatch(setBlogDetails(res.data));
            setTagBuffer(null);
            setEditDetails(null);
        })
    };

    /**
     * Function to handle removing a tag from the tag buffer.
     * This stages it to be deleted if a user submits the edit profile 
     * form.
     * @param {string} tag - Tag to remove 
     * @returns {void} - This function does not return anything
     */
    const onDeleteTag = tag => {
        setTagBuffer(tagBuffer.filter(x => x !== tag));
    }

    /**
     * This stages it to be added if a user submits the edit profile 
     * form.
     * @returns {void} - This function does not return anything
     */
    const onAddTag = () => {
        setTagBuffer([...tagBuffer, newTag]);
    }



    if (!blog.title) return <React.Fragment></React.Fragment>;
    const descriptionBlocks = blog.description.split(/(?:\r\n|\r|\n)/g).filter(x => x !== '');
    console.log(descriptionBlocks);
    return (
        <div className={classNames(classes.container)}>
            <CreateBlogModal open={createBlog} onClose={() => setCreateBlog(false)} blogId={blog._id} ariaLabelledBy='Create Blog' ariaDescribedBy='Create Blog' currUser={user} showSuccess={() => { }} />
            <Card>
                <div className={classNames(classes.titleTags, 'bottom-margin')}>
                    {!editDetails &&
                        <Typography className={classes.title} variant="h1">{blog.title}</Typography>
                    }
                    {editDetails &&
                        <React.Fragment>
                            <TextField variant="outlined" label="Blog Title" defaultValue={blog.title} placeholder="title"
                                className={classes.titleTextBox} onChange={(event) => {
                                    setEditDetails({ ...editDetails, title: event.target.value });
                                }} />
                        </React.Fragment>
                    }
                    <div className='flex'>
                        {!tagBuffer && blog.tags.map(tag => (
                            <Tag content={tag} key={tag.length + (Math.random() * 100)} />
                        ))}
                        {tagBuffer && tagBuffer.length < 3 &&
                            <React.Fragment>
                                <TextField style={{ width: 100 }} label="" defaultValue='' placeholder='new tag'
                                    onChange={(event) => {
                                        setNewTag(event.target.value);
                                    }} />
                                <IconButton onClick={onAddTag}><AddIcon style={{ width: 30, height: 30 }} /></IconButton>
                            </React.Fragment>
                        }
                        {tagBuffer && tagBuffer.length > 0 && tagBuffer.map(x => (
                            <Tag content={x} readOnly={!editDetails} key={x.length + (Math.random() * 100)} onDelete={tag => onDeleteTag(tag)} />

                        ))}
                    </div>
                </div>
                {!editDetails &&
                    <React.Fragment>
                        <div className={classes.description}>
                            {descriptionBlocks?.map((block, i) => (
                                <Typography key={i} variant="h2" className={classes.descriptionBlock}>{block}</Typography>
                            ))}
                        </div>
                        <Typography variant="h3" className='top-margin'>Created and maintained by <strong>{blog.author}</strong></Typography>
                    </React.Fragment>

                }
                {editDetails &&
                    <React.Fragment>
                        <TextField variant="outlined" label="Blog Description" defaultValue={blog.description} placeholder="description"
                            multiline rows={3} onChange={(event) => {
                                setEditDetails({ ...editDetails, description: event.target.value });
                            }} />
                        <div className='flex margin-top'>
                            <DefaultButton onClick={updateDetails}>Update</DefaultButton>
                            <DefaultButton warn={true} onClick={editBlogDetails}>Cancel</DefaultButton>
                        </div>
                    </React.Fragment>
                }
                {!readOnly &&
                    <div className='grow'>
                        <div className={classes.editButton} onClick={editBlogDetails}>
                            <EditIcon style={{ height: 12, width: 12, marginRight: 5 }} />
                            <Typography variant="body2">Edit Profile Details</Typography>
                        </div>
                    </div>
                }
            </Card>
            <div className={classes.posts}>
                <div className={classNames('flex', classes.headerContainer)}>
                    <Typography variant="h1">Posts</Typography>
                    {!readOnly &&
                        <IconButton onClick={() => setCreateBlog(true)}>
                            <AddIcon />
                        </IconButton>
                    }
                </div>
                {blog.blogPosts.map((post, i) => (
                    <BlogPost key={i} history={history} user={user} post={post} readOnly={readOnly} />
                ))}
            </div>
        </div>
    )
};

Blog.propTypes = {
    classes: object.isRequired,
    user: object.isRequired,
    history: object.isRequired,
    readOnly: bool
}

Blog.defaultProps = {
    readOnly: false
}

export default withRouter(withStyles(styles)(Blog));
