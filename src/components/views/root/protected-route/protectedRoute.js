import React from 'react'
import { Route, useHistory } from 'react-router-dom';
import { getItem } from '../../../../utils/localStorage';

const ProtectedRoute = ({ path, component }) => {

    const history = useHistory();
    const authenticated = getItem('_auth');
    if (authenticated === 'false') {
        history.push('/app/login');
    }

    return (
        <Route exact path={path} component={component} />
    );
};

export default ProtectedRoute;
