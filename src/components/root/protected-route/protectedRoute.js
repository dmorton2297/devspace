import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, component }) => {

    const user = useSelector(state => state.userReducer);
    const history = useHistory();

    useEffect(() => {
        if (!user.id) {
            history.push('/login');
        };
        
    }, [user, history]);

    if (!user.id) {
        return <h1>Error occured</h1>;
    }

    return (
        <Route exact path={path} component={component} />
    );
};

export default ProtectedRoute;
