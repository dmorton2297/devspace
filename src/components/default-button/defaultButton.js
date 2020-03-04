import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const DefaultButton = ({children, classes}) => {
    return <Button classes={{ root: classes.button }}>{children}</Button>
};

export default withStyles(styles)(DefaultButton);
