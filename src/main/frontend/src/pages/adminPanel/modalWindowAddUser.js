import Button from "../button/button";
import React, { useState } from "react";

function ModalWindowAddUser({clickAddUser, onClickOpenWindowUser, team, error}) {
    const [login, setLogin] = useState('');

    const clickSetLogin = (event) => {
        const value = event.target.value;
        // Проверка: только английские буквы
        const regex = /^[A-Za-z]+$/; // Регулярное выражение для проверки только английских букв
        if (regex.test(value) || value === '') { // Позволяем пустую строку
            setLogin(value);
        }
    };

    return (
        <div className="modal-overlay modal-index">
            <div className="modal-content modal-center">
                <h2>Добавить участника в {team.name}!</h2>
                <div className={`name-season wh-43`}>
                    <label className={`label-left margin-right`}>Введите логин:</label>
                    <input
                        className={`nick-name`}
                        name={`login`}
                        placeholder={`Login`}
                        value={login}
                        onChange={clickSetLogin} // Обновляем обработчик события
                    />
                </div>
                {error && (
                    <div className={`message error wh-43`}>{error}</div>
                )}
                <Button
                    handleCloseModal={onClickOpenWindowUser}
                    submitYes={'add'}
                    submiteNo={'exit'}
                    handleFunction={clickAddUser}
                    item={team.id}
                    login={login}
                />
            </div>
        </div>
    );
}

export default ModalWindowAddUser;
