import axios from 'axios';

/**
 * 
 * @param {string} email - Email of the user we want to login.
 * @param {password} password - Password of the suer we want to login.
 */
export const loginUser = (email, password) => {
    return axios.post('http://localhost:3200/login', { email: email, password: password });
}; 

export const updateProfile = (user, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/update`, user)
}

export const getUserProjects = userId => {
    return axios.get(`http://localhost:3200/user/${userId}/projects`);
};

export const createUserProject = (project, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/projects/create`, project);
}

export const editUserProject = (project, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/projects/edit`, project);
}

export const deleteUserProject = (project, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/projects/delete`, project);
}