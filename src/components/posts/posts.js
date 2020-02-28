import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { object } from 'prop-types';

import React from 'react';
import styles from './styles';

const Posts = ({ classes }) => {
    return (
        <div className={classNames(classes.container)}>
            <h1>Profile</h1>
        </div>
    )
};

Posts.propTypes = {
    classes: object.isRequired
}

export default withStyles(styles)(Posts);
