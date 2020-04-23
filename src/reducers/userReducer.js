import { SET_USER, UPDATE_USER } from '../actions/userActions';

const userReducer = (user = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...user, 
                ...action.payload
            });
        case UPDATE_USER:
            return ({
                ...action.payload
            })
        default:
            return user;
    };
};

export default userReducer;