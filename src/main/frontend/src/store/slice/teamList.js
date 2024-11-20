import axios from 'axios';

const API_URL = 'http://localhost:8080/users/team/';
export const fetchTeamList = async (login) => {
    try {
        const response = await axios.get(`${API_URL}${login}`);
        return response.data;
    } catch (error) {
        throw new Error('f ' + error.message);
    }
};