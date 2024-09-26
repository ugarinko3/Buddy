import { fetchToken } from '../../store/slice/tokenSlice';
import { useEffect } from "react";
import { getCookie } from "../cookie/getCookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useCheckToken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, login, role, create } = useSelector((state) => state.token);

    useEffect(() => {
        const loginCookie = getCookie('login');
        const tokenCookie = getCookie('access_token');

        const fetchAndCheckToken = async () => {
            await dispatch(fetchToken(loginCookie, tokenCookie));
            // if (error) {
            //     navigate('/'); // Перенаправление на главную страницу
            // }
        };

        fetchAndCheckToken();
    }, [dispatch, navigate, error]);

    return { login, role, create };
}
