import { withStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import { getBlog } from '../../../../services/webService';
import Blog from '../../blog';

const PublicBlog = ({ match, classes }) => {

    const [blog, setBlog] = useState(null);

    useEffect(() => {
        getBlog(match.params.email).then((res) => {
            setBlog(res.data);
        });
    }, [setBlog, match]);

    if (!blog) {
        return <React.Fragment>Loading ...</React.Fragment>
    }

    return (
        <Blog user={{}} readOnly dataOverride={blog} />
    );
};


PublicBlog.propTypes = {
    match: object.isRequired,
    classes: object.isRequired,
};

export default withStyles(styles)(withRouter(PublicBlog));

