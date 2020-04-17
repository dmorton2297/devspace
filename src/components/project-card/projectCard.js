import React from 'react'
import { withStyles, makeStyles } from '@material-ui/styles';
import styles from './styles';
import { Card, Typography } from '@material-ui/core';

const ProjectCard = ({ project, classes }) => {
    const useStyles = makeStyles({
        projImage: {
            height: 400,
            width: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundImage: `url("${project.image}")`
        }
    })
    const imageClasses = useStyles();
    return (
        <Card className={classes.container}>
            <Typography className={classes.projectName} variant="h2">{project.name}</Typography>
            <div className={imageClasses.projImage}></div>
        </Card>
    );
};

export default withStyles(styles)(ProjectCard);
