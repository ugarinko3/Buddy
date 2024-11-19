import React, { useState } from 'react';
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { fetchCreateAvatar } from "../../store/slice/profileSlice";
// import './WindowPhoto.css'; // Импортируем CSS файл для стилей

function WindowPhoto({ handeCloseModal, login, reloadProfile }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); // Состояние для хранения сообщения об ошибке

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Сохраняем файл
            setError(""); // Сбрасываем сообщение об ошибке при выборе нового файла
        }
    };

    const createPhoto = () => {
        if (!image) {
            setError("Пожалуйста, загрузите фотографию."); // Устанавливаем сообщение об ошибке
            return; // Прерываем выполнение функции, если фотография не загружена
        }

        setLoading(true); // Устанавливаем состояние загрузки в true
        setImage(null); // Убираем изображение

        dispatch(fetchCreateAvatar(image, login)); // Передаем файл в функцию

        // Устанавливаем таймер на 12 секунд
        setTimeout(() => {
            reloadProfile(); // Вызываем reloadProfile через 12 секунд
            setLoading(false); // Сбрасываем состояние загрузки
        }, 12000);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Изменить фото профиля.</h2>
                <div className={`line wh-12`}></div>
                <div className={`createImage`}>
                    <div className="container">
                        {!loading ? (
                            <>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                <div className="image-preview">
                                    {image && <img src={URL.createObjectURL(image)} alt="Image Preview" />}
                                </div>
                                {error && <div className="error-message">{error}</div>} {/* Выводим сообщение об ошибке */}
                            </>
                        ) : (
                            <div className="loading-container">
                                <div className="loading-bar"></div>
                            </div>
                        )}
                        {!loading && (<Button
                            submiteNo={"Отмена"}
                            submitYes={"Изменить"}
                            handleCloseModal={handeCloseModal}
                            handleFunction={createPhoto}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WindowPhoto;
