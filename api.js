import axios from 'axios';

const API_URL = 'https://reactfrontend-de123.netlify.app/api';

export const getData = async () => {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
};

export const addData = async (name) => {
    const response = await axios.post(`${API_URL}/data`, { name });
    return response.data;
};
