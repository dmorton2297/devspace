import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import styles from './styles';

const DefaultButton = ({children, classes, onClick, warn}) => {
    return <Button onClick={onClick} classes={{ root: !warn ? classes.button : classes.warn }}>{children}</Button>
};

export default withStyles(styles)(DefaultButton);
