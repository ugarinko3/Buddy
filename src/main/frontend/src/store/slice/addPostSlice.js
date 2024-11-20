import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const submitPost = async (formData) => {
    try {
        const response = await axios.post(API_URL + '/post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const submitPostDay = async (formData) => {
    try {
        const response = await axios.post(API_URL + '/calendar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
