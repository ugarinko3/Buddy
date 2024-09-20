// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/post'; // Replace with your actual backend URL

export const submitPost = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        throw error; // Rethrow the error to handle it in the component
    }
};
