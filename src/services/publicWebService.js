import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_PUB_URL;

export const userExists = (email) => {
    return axios.get(`${BASE_URL}auth/exists/${email}`);
}