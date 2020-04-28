import axios from 'axios';
import { getItem, setItem } from '../utils/localStorage';
import firebase from 'firebase';

axios.interceptors.request.use(config => {
    const token = getItem('auth');
    if (!token) {
        console.error('Auth Token not set');
    }
    else {
        console.log('in here');
        console.log(token);
        config.headers['Authorization'] = token;
    }

    return config;
});

axios.interceptors.response.use(res => {
    return res;
}, error => {
    if (error.response.status === 401) {
        window.location = 'login';
    }
})
/**
 * 
 * @param {string} email - Email of the user we want to login.
 * @param {password} password - Password of the suer we want to login.
 */
export const loginUser = (email, password) => {
    return axios.post('http://localhost:3200/login', { email: email, password: password });
}; 

export const getUser = (email) => {
    return axios.get(`http://localhost:3200/user/${email}`);
}

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

export const getUserBlogs = userId => {
    return axios.get(`http://localhost:3200/user/${userId}/blog`);
}

export const updateBlogDetails = (blog, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/blog/edit`, blog);
}

export const getBlogPost = (postId, userId) => {
    return axios.get(`http://localhost:3200/blog/${postId}/${userId}`);
}

export const createBlogPost = (post, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/blog`, post);
}

export const editBlogPost = (post, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/blog/posts/edit`, post);
}

export const deleteBlogPost = (post, userId) => {
    return axios.post(`http://localhost:3200/user/${userId}/blog/posts/delete`, post);
}