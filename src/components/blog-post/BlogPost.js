import React from 'react'
import { withStyles, Typography, Card, makeStyles } from '@material-ui/core';
import styles from './styles';
import { object, func } from 'prop-types';
import classNames from 'classnames';
import Tag from '../shared/tag';

const BlogPost = ({ classes, post }) => {

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

    const postImage = useStyles();
    console.log(post);
    return (
        <Card className={classNames(classes.container, 'full-width', 'flex')}>
            <div className={classes.infoContainer}>
                <Typography className={classNames(classes.title)} variant='h2'>{post.title}</Typography>
                <hr style={{ color: 'white', margin: '0 30px 0 20px' }} />
                <Typography className={classNames(classes.description)} variant="h2">{post.description}</Typography>
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
}

export default withStyles(styles)(BlogPost);
