import React from 'react'
import { bool, func, string, object } from 'prop-types';

const DeleteProjectModal = ({ classes, open, onClose, ariaLabelledBy, ariaDescribedby, project }) => {
    if (!project) return <div></div>;
    return (
        <div>
        </div>
    );
};

DeleteProjectModal.propTypes = {
    classes: object.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
    project: object,
    ariaLabelledBy: string,
    ariaDescribedby: string
}
