import { SET_USER } from '../actions/userActions';

const userReducer = (user = {}, action) => {
    const payload = action.payload;
    console.log(payload);
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