import React, { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { getItem, setItem } from '../../../utils/localStorage';
import { checkAuthenticated } from '../../../services/authUtils';
import { CircularProgress } from '@material-ui/core';

const ProtectedRoute = ({ path, component }) => {

    const [authenticating, setAuthenticating] = useState(true);

    useEffect(() => {
        const firebaseUserExists = async () => {
            const authenticated = await checkAuthenticated();
            if (!authenticated) {
                setItem('_auth', 'false');
            }
            setAuthenticating(false);
        }
        firebaseUserExists();
    })

    const history = useHistory();
    const authenticated = getItem('_auth');
    if (authenticated === 'false') {
        history.push('/login');
    }

    if (authenticating) {
        return <CircularProgress />;
    }

    return (
        <Route exact path={path} component={component} />
    );
};

export default ProtectedRoute;
