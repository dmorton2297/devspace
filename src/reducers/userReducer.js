import { SET_USER } from '../actions/userActions';

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...user, 
                ...action.payload
            });
        default:
            return user;
    };
};

export default userReducer;