import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object, bool, func, string, any } from 'prop-types';
import { Modal, Card, Button } from '@material-ui/core';
import DefaultButton from '../../default-button';

const BaseModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, children, buttonText, buttonFunc, cancelButton }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedby}>
            <Card className='full-size-modal'>
                <div className={classes.contentContainer}>
                    {children}
                </div>
                <div className={classes.buttonContainer}>
                    <DefaultButton onClick={buttonFunc}>{buttonText}</DefaultButton>
                    {cancelButton &&
                        <Button className={classes.cancelButton} onClick={onClose}>Cancel</Button>
                    }
                </div>
            </Card>
        </Modal >
    );
};

BaseModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    ariaLabelledBy: string,
    ariaDescribedby: string,
    children: any.isRequired,
    buttonText: string.isRequired,
    buttonFunc: func.isRequired,
    cancelButton: bool
}

BaseModal.defaultProps = {
    cancelButton: false
}

export default withStyles(styles)(BaseModal);
