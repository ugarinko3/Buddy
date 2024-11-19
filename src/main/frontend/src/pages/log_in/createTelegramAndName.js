import React, { useState } from "react";
import {createTelegram} from "../../store/slice/telegramSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function CreateTelegramAndName() {
    const {result}  = useSelector((state) => state.telegram);
    const {login}  = useSelector((state) => state.token);
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [telegram, setTelegram] = useState(""); // Инициализируем как пустую строку
    const [name, setName] = useState(""); // Инициализируем как пустую строку
    const [error, setError] = useState(""); // Состояние для хранения ошибок
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validateName = (name) => {
        // Проверка имени
        if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name) || name.length < 2) {
            return "Имя должно содержать только буквы и быть не короче 2 символов.";
        }
        return ""; // Если имя корректно, возвращаем пустую строку
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName); // Обновляем состояние имени
        setError(validateName(newName)); // Проверяем имя и обновляем состояние ошибки
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            setIsLoading(false);
            return;
        } else {
            setError("");
            const formData = {
                "name": name,
                "login": login,
                "telegram": telegram,
            };
            await dispatch(createTelegram(formData));
            if (result === 0) {
                navigate("/post");
            }
        }
        setIsLoading(false);
    };

    return (
        <div className={`mr-142`}>
            <div className={`login mr-141`}>
                <h2 className={`mr-1`}>Добро пожаловать!</h2>

                <form className={`container-form mr-140`} onSubmit={handleSubmit}>
                    <label htmlFor="name">Введите имя</label>
                    <div className="form_item mr-139">
                        <input
                            id="name"
                            placeholder='Name'
                            value={name} // Привязываем значение к состоянию
                            onChange={handleNameChange} // Обновляем состояние при изменении
                        />
                    </div>
                    <label htmlFor="telegram">Введите ник Телеграм</label>
                    <div className="form_item mr-139">
                        <input
                            id="telegram"
                            placeholder='@telegram'
                            value={telegram} // Привязываем значение к состоянию
                            onChange={(e) => setTelegram(e.target.value)} // Обновляем состояние при изменении
                        />
                    </div>
                    {error && (
                        <div className="error mr-144">
                            <p className="error-message">{error}</p>
                            <div className="error-icon">⚠️</div>
                        </div>
                    )}
                    <div className='submit mr-143'>
                        <button
                            className='btn create-btn login-submit'
                            id='login-submit'
                            type="submit"
                            disabled={isLoading} // Отключаем кнопку во время загрузки
                        >
                            {isLoading ? (
                                <div className="loading-spinner"></div> // Индикатор загрузки
                            ) : (
                                <p>Log in</p>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTelegramAndName;
