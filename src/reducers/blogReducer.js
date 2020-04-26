import { SET_BLOG } from '../actions/blogActions';

const blogReducer = (blog = {}, action) => {
    switch (action.type) {
        case SET_BLOG:
            console.log('in here');
            return ({
                ...action.payload
            })
        default:
            return blog;
    }
};

export default blogReducer;