import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = Cookies.get('access_token');

  // Здесь можно добавить дополнительную проверку токена, если необходимо
  const isAuthenticated = Boolean(token); // Простой способ проверки

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
