import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { object, bool } from 'prop-types';

import React, { useEffect, useState } from 'react';
import styles from './styles';
import { Card, Typography, IconButton } from '@material-ui/core';
import { getUserBlogs } from '../../services/webService';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog } from '../../actions/blogActions';
import Tag from '../shared/tag';
import { withRouter } from 'react-router-dom';
import BlogPost from '../blog-post/BlogPost';
import AddIcon from '@material-ui/icons/Add';
import CreateBlogModal from '../modals/create-blog-modal';

const Blog = ({ classes, user, history, readOnly }) => {

    const dispatch = useDispatch();
    const blog = useSelector(state => state.blogReducer);
    const [createBlog, setCreateBlog] = useState(false);

    useEffect(() => {
        getUserBlogs(user.id).then((res) => {
            dispatch(setBlog(res.data));
        })
    }, [dispatch, user])


    if (!blog.title) return <React.Fragment></React.Fragment>;
    return (
        <div className={classNames(classes.container)}>
            <CreateBlogModal open={createBlog} onClose={() => setCreateBlog(false)} ariaLabelledBy='Create Blog' ariaDescribedBy='Create Blog' currUser={user} showSuccess={() => {}} />
            <Card>
                <div className={classNames(classes.titleTags, 'flex', 'bottom-margin')}>
                    <Typography variant="h1">{blog.title}</Typography>
                    <div className='flex'>
                        {blog.tags.map(tag => (
                            <Tag content={tag} key={tag.length + (Math.random() * 100)} />
                        ))}
                    </div>
                </div>
                <Typography variant="h2" className={classes.description}>{blog.description}</Typography>
                <Typography variant="h3" className='top-margin'>Created and maintained by <strong>{user.name}</strong></Typography>
            </Card>
            <div className={classes.posts}>
                <div className='flex'>
                    <Typography variant="h1">Posts</Typography>
                    {!readOnly && 
                        <IconButton onClick={() => setCreateBlog(true)}>
                            <AddIcon />
                        </IconButton>
                    }
                </div>
                {blog.blogPosts.map(post => (
                    <div onClick={() => history.push(`/posts/${post.id}/${user.id}`)}>
                        <BlogPost key={post.id} post={post} />
                    </div>
                ))

                }
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
