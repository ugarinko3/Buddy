import axios from 'axios';

const API_URL = 'http://localhost:8080/users/role-user-cur/';

export const fetchUserRole = async (login) => {
    try {
        const response = await axios.get(API_URL+login);
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении роли пользователя: ' + error.message);
    }
};

export default fetchUserRole.reducer;
