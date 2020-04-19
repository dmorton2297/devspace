import React from 'react'
import { withStyles, makeStyles } from '@material-ui/styles';
import styles from './styles';
import { Card, Typography } from '@material-ui/core';
import { object, func } from 'prop-types';

const ProjectCard = ({ project, classes, onClick }) => {
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
        <Card className={classes.container} onClick={() => onClick(project.id)}>
            <Typography className={classes.projectName} variant="h2">{project.name}</Typography>
            <div className={imageClasses.projImage}></div>
        </Card>
    );
};

ProjectCard.propTypes = {
    project: object.isRequired,
    classes: object.isRequired,
    onClick: func.isRequired

}

export default withStyles(styles)(ProjectCard);
