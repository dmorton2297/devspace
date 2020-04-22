export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';

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
    }
};
