import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Для использования dispatch
import '../../css/calendar.scss';

import { fetchCreateCalendar } from '../../store/slice/calendarSlice'; // Импортируем нашу функцию

const Modal = ({ isOpen, onClose }) => {
    const [startDate, setStartDate] = useState(''); // Состояние для начала даты
    const [endDate, setEndDate] = useState(''); // Состояние для конца даты
    const [showError, setShowError] = useState(false); // Состояние для показа ошибки
    const dispatch = useDispatch(); // Для отправки действий в Redux
    const maxDate = '2030-12-31'; // Ограничение по дате до 2030 года

    if (!isOpen) return null;

    const formatDateToDDMMYYYY = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const handleDateChange = (e, setDate) => {
        const selectedDate = e.target.value;

        // Если выбранная дата больше 2030-12-31, устанавливаем максимальную дату
        if (selectedDate > maxDate) {
            setDate(maxDate);
        } else {
            setDate(selectedDate);
        }

        setShowError(false); // Сбрасываем ошибку, если пользователь ввел дату
    };

    const handleBlur = (e, setDate) => {
        const selectedDate = e.target.value;

        // Автоматически исправляем дату, если она превышает 2030-12-31
        if (selectedDate > maxDate) {
            setDate(maxDate);
            e.target.value = maxDate; // Обновляем поле ввода
        }
    };

    // Проверка, заполнены ли обе даты
    const isFormValid = startDate !== '' && endDate !== '';

    // Обработчик для кнопки создания
    const handleCreateClick = () => {
        if (!isFormValid) {
            setShowError(true); // Показываем ошибку, если форма невалидна
        } else {
            dispatch(fetchCreateCalendar(formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate)));
            // console.log(startDate, endDate);
            onClose();
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Выберите период</h2>
                <div className="date-inputs">
                    <div className="date-picker">
                        <label htmlFor="start-date">С какого:</label>
                        <input
                            id="start-date"
                            type="date"
                            className="date-field"
                            max={maxDate}
                            value={startDate}
                            onChange={(e) => handleDateChange(e, setStartDate)}
                            onBlur={(e) => handleBlur(e, setStartDate)} // Проверка при потере фокуса
                        />
                    </div>
                    <div className="date-picker">
                        <label htmlFor="end-date">По какое:</label>
                        <input
                            id="end-date"
                            type="date"
                            className="date-field"
                            max={maxDate}
                            value={endDate}
                            onChange={(e) => handleDateChange(e, setEndDate)}
                            onBlur={(e) => handleBlur(e, setEndDate)} // Проверка при потере фокуса
                        />
                    </div>
                </div>

                {/* Сообщение об ошибке */}
                {showError && (
                    <div className="error-message" style={{ color: '#c01e1e'}}>
                        Please fill in both dates.
                    </div>
                )}

                <div className="modal-buttons">
                    <button className="btn cancel-btn" onClick={onClose}>Отмена</button>
                    <button
                        className="btn create-btn"
                        onClick={handleCreateClick}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
