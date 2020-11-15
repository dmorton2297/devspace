import axios from 'axios';
import { getItem } from '../utils/localStorage';

axios.interceptors.request.use(config => {
    const token = getItem('auth');
    if (!token) {
        console.error('Authorization token note set');
    }
    else {
        config.headers['Authorization'] = token;
    }

    return config;
});

axios.interceptors.response.use(res => {
    return res;
}, error => {
    if (error.response && error.response.status === 401) {
        // window.location = 'login';
    }
})

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * 
 * @param {string} email - Email of the user we want to login.
 * @param {password} password - Password of the suer we want to login.
 */
export const loginUser = (email, password) => {
    return axios.post(`${BASE_URL}login`, { email: email, password: password });
}; 

export const getUser = (email) => {
    return axios.get(`${BASE_URL}user/${email}`);
}

export const updateProfile = (user, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/update`, user)
}

export const getUserProjects = userId => {
    return axios.get(`${BASE_URL}user/${userId}/projects`);
};

export const createUserProject = (project, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/projects/create`, project);
}

export const editUserProject = (project, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/projects/edit`, project);
}

export const deleteUserProject = (project, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/projects/delete`, project);
}

export const getUserBlogs = userId => {
    return axios.get(`${BASE_URL}user/${userId}/blog`);
}

export const updateBlogDetails = (blog, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/blog/edit`, blog);
}

export const getBlogPost = (postId, userId) => {
    return axios.get(`${BASE_URL}blog/${postId}/${userId}`);
}

export const getBlog = (email) => {
    return axios.get(`${BASE_URL}blog/${email}`);
}

export const createBlogPost = (post, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/blog`, post);
}

export const editBlogPost = (post, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/blog/posts/edit`, post);
}

export const deleteBlogPost = (post, userId) => {
    return axios.post(`${BASE_URL}user/${userId}/blog/posts/delete`, post);
}

export const createUser = (user) => {
    return axios.post(`${BASE_URL}user/create`, user);
}