export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const UPDATE_PROJECT = 'UDPATE_PROJECT';

export function setProjects(payload) {
    return {
        type: SET_PROJECTS,
        payload
    };
};

export function addProject(payload) {
    return {
        type: ADD_PROJECT,
        payload
    };
};

export function deleteProject(payload) {
    return {
        type: DELETE_PROJECT,
        payload
    };
};

export function updateProject(payload) {
    return {
        type: UPDATE_PROJECT,
        payload
    };
};
