import React from 'react';
import theme from '../../../theme';
import CloseIcon from '@material-ui/icons/Close';

import { IconButton, Typography } from '@material-ui/core';


const Tag = ({ content, readOnly, onDelete }) => {
    const classes = {
        tag: {
            outline: `1px solid ${theme.palette.primary.main}`,
            color: theme.palette.primary.main,
            padding: 10,
            borderRadius: 10,
            marginRight: 10,
            height: 20
        },
    }
    return <div className='flex' style={{ ...classes.tag }}>
        {!readOnly &&
            <IconButton onClick={() => onDelete(content)} style={{ color: theme.palette.primary.main }}><CloseIcon style={{ height: 20, width: 20 }} /></IconButton>
        }
        <Typography variant="body1" key={`x${Math.random() * 100}`}>{content}</Typography>
    </div>
};

Tag.defaultProps = {
    readOnly: true
};

export default Tag;