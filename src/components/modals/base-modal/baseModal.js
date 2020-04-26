import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { object, bool, func, string, any } from 'prop-types';
import { Modal, Card, Button } from '@material-ui/core';
import DefaultButton from '../../shared/default-button';

const BaseModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, children, buttonText, buttonFunc, showButton, cancelButton, stepButton }) => {
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
                    {showButton &&
                        <DefaultButton onClick={buttonFunc}>{buttonText}</DefaultButton>
                    }
                    {stepButton &&
                        <DefaultButton onClick={stepButton.action}>{stepButton.text}</DefaultButton>
                    }
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
    showButton: bool,
    cancelButton: bool,
    stepButton: object,
}

BaseModal.defaultProps = {
    cancelButton: false,
    stepButton: {},
    showButton: true
}

export default withStyles(styles)(BaseModal);
