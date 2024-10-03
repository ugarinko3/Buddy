import { fetchToken } from '../../store/slice/tokenSlice';
import { useEffect, useState } from "react";
import { getCookie } from "../cookie/getCookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useCheckToken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hasCheckedToken, setHasCheckedToken] = useState(false); // Состояние для отслеживания проверки токена

    const { error, login, role, create } = useSelector((state) => state.token);

    useEffect(() => {
        const loginCookie = getCookie('login');
        const tokenCookie = getCookie('access_token');

        const fetchAndCheckToken = async () => {
            if (!hasCheckedToken) { // Проверяем, был ли уже выполнен запрос
                await dispatch(fetchToken(loginCookie, tokenCookie));
                setHasCheckedToken(true); // Устанавливаем флаг, что проверка токена выполнена

                // Проверяем наличие ошибки после получения токена
                // if (error) {
                //     navigate('/'); // Перенаправление на главную страницу в случае ошибки
                // }
            }
        };

        fetchAndCheckToken();
    }, [dispatch]); // Добавляем hasCheckedToken в зависимости

    return { login, role, create };
}
