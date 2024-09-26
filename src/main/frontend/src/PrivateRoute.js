import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Component, ...props }) => {
  const token = Cookies.get('access_token');

  // Простой способ проверки токена
  const isAuthenticated = Boolean(token);

  return isAuthenticated ? (
      <Component {...props} />
  ) : (
      <Navigate to="/" replace state={{ from: props.location }} />
  );
};

export default PrivateRoute;