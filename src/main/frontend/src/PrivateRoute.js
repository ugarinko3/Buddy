import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchToken } from './store/slice/tokenSlice'; // ваш redux slice
import { getCookie } from './pages/cookie/getCookie';
import Loading from "./pages/loading/loading"; // функция для получения токенов из куки

const PrivateRoute = ({ element: Component }) => {
  const dispatch = useDispatch();
  const { login, error } = useSelector((state) => state.token); // Извлекаем состояние из redux

  useEffect(() => {
    const loginCookie = getCookie('login');
    const tokenCookie = getCookie('access_token');

    // Проверка: если токен не загружен и нет ошибки, загружаем токен
    if (!login && !error) {
      dispatch(fetchToken(loginCookie, tokenCookie)); // делаем запрос
    }
  }, []);

  // Если произошла ошибка с токеном, перенаправляем на страницу логина
  // if (error) {
  //   return <Navigate to="/" />;
  // }

  // Если токен еще не загружен, показываем индикатор загрузки
  if (!login) {
    return <Loading />; // Здесь можно сделать более сложный индикатор
  }

  // Если токен валиден, рендерим переданный компонент
  return <Component />;
};

export default PrivateRoute;