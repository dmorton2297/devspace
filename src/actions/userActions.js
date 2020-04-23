export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function setUser(payload) {
    return { 
        type: SET_USER,
        payload
    };
};

export function updateUser(payload) {
    return {
        type: UPDATE_USER,
        payload
    };
};