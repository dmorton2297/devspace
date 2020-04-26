export const SET_BLOG = 'SET_BLOG';
export const ADD_BLOG_POST = 'ADD_BLOG_POST';
export const UPDATE_BLOG_POST = 'UPDATE_BLOG_POST';
export const DELETE_BLOG_POST = 'DELETE_BLOG_POST'

export function setBlog(payload) {
    return {
        type: SET_BLOG,
        payload
    }
};

export function addBlogPost(payload) {
    return {
        type: ADD_BLOG_POST,
        payload
    }
};

export function updateBlogPost(payload) {
    return {
        type: UPDATE_BLOG_POST,
        payload
    }
};

export function removeBlogPost(payload) {
    return {
        type: DELETE_BLOG_POST,
        payload
    }
};