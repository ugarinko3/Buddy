import axios from 'axios';

const API_URL = '/post/role-user-cur'; // Замените на ваш фактический URL

export const fetchUserRole = async (login) => {
    try {
        const response = await axios.get(API_URL, {
            params: { login } // Передаем login как параметр запроса
        });
        return response.data; // Предполагается, что данные содержат информацию о пользователе
    } catch (error) {
        throw new Error('Ошибка при получении роли пользователя: ' + error.message);
    }
};
export default fetchUserRole.reducer;