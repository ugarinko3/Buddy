import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Импортируем Provider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'; // Импортируйте ваш store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Оборачиваем App в Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Если вы хотите начать измерять производительность в вашем приложении, передайте функцию
// для логирования результатов (например: reportWebVitals(console.log))
// или отправьте на аналитический сервер. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals();

