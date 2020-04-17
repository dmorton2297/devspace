import axios from 'axios';

/**
 * 
 * @param {string} email - Email of the user we want to login.
 * @param {password} password - Password of the suer we want to login.
 */
export const loginUser = (email, password) => {
    return axios.post('http://localhost:3200/login', { email: email, password: password });
}; 

export const getUserProjects = userId => {
    return axios.get(`http://localhost:3200/user/${userId}/projects`);
};
