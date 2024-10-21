import React, {useState } from 'react';
import {useDispatch} from "react-redux";
import Burger from "../header/header_burger";
import "../../css/admin.scss"
import {fetchCreateCurator, fetchCreateUser, fetchGeneratorCommand} from "../../store/slice/adminSlice";
import GetTeam from "./getTeam";
import {fetchGetTeam} from "../../store/slice/teamSlice";

function AdminPanel() {
    const [curatorNickName, setCuratorNickName] = useState(''); // Состояние для никнейма куратора
    const [userNickName, setUserNickName] = useState(''); // Состояние для никнейма пользователя
    const [message, setMessage] = useState(''); // Состояние для сообщения
    const [isError, setIsError] = useState(false); // Состояние для отслеживания ошибок
    const [isModal, setIsModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const dispatch = useDispatch();



    const handleCuratorInputChange = (event) => {
        setCuratorNickName(event.target.value);
        setMessage(''); // Сбрасываем сообщение при вводе
        setIsError(false); // Сбрасываем состояние ошибки
    };

    const handleUserInputChange = (event) => {
        setUserNickName(event.target.value);
        setMessage(''); // Сбрасываем сообщение при вводе
        setIsError(false); // Сбрасываем состояние ошибки
    };

    const handleSubmitCurator = async (event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        try {
            await fetchCreateCurator(curatorNickName);
            setMessage("Куратор добавлен успешно!"); // Устанавливаем сообщение
            setCuratorNickName(''); // Сбрасываем поле ввода
            setIsError(false); // Устанавливаем состояние успешного выполнения
        } catch (error) {
            setMessage("Ошибка при добавлении куратора."); // Устанавливаем сообщение об ошибке
            setIsError(true); // Устанавливаем состояние ошибки
        }
    };

    const handleSubmitUser = async (event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        try {
            await fetchCreateUser(userNickName);
            setMessage("Кураторство снято успешно!"); // Устанавливаем сообщение
            setUserNickName(''); // Сбрасываем поле ввода
            setIsError(false); // Устанавливаем состояние успешного выполнения
        } catch (error) {
            setMessage("Ошибка при снятии."); // Устанавливаем сообщение об ошибке
            setIsError(true); // Устанавливаем состояние ошибки
        }
    };

    const clickGetTeam = () => {
        dispatch(fetchGetTeam());
    }

    const modalOpen = () => {
        setIsModal(true);
        clickGetTeam();
    };
    const handleCloseModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsModal(false);
            // setIsLoading(false);
        }, 300);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            handleCloseModal();
        }
    };

    const clickCommand = () => {
        try {
            fetchGeneratorCommand();
            setMessage("Команды создались!")
        } catch (error) {
            setMessage("Ошибка при генерации команды")
            setIsError(true);
        }
    }

    return (
        <div className={`main`}>
            <Burger />
            <div className={`conteiner-main-news`}>
                <div className={`panel-admin`}>
                    <div className={`create-role center`}>
                        <div className={`container-function`}>
                            <button className={`btn create-btn margin`} onClick={clickCommand}>Сгенерировта команды</button>
                        </div>
                        <div className={`container-function`}>
                            <button className="btn create-btn margin" onClick={modalOpen}>Посмотреть команды</button>
                        </div>
                    </div>
                    {message && (
                        <p className={`message container-width-panel ${isError ? 'error' : 'success'}`}>
                            {message}
                        </p>
                    )}
                    <div className={`create-role`}>
                        <form onSubmit={handleSubmitCurator} className={`container-function`}>
                            <label className={`label-left`}>Назначение куратора</label>
                            <label className={`label-left container-width-panel wh-120`}>Введите никнейм</label>
                            <input
                                className={`nick-name container-width-panel`}
                                value={curatorNickName}
                                onChange={handleCuratorInputChange}
                            />
                            <button className={`btn create-btn btn-top container-width-panel`} type="submit">Назначить
                                куратора
                            </button>
                        </form>
                        <form onSubmit={handleSubmitUser} className={`container-function`}>
                            <label className={`label-left`}>Снятие кураторства</label>
                            <label className={`label-left container-width-panel wh-120`}>Введите никнейм</label>
                            <input
                                className={`nick-name container-width-panel`}
                                value={userNickName}
                                onChange={handleUserInputChange}
                            />
                            <button className={`btn cancel-btn btn-top container-width-panel`} type="submit">Снять кураторство
                            </button>
                        </form>
                    </div>
                    <div className={`container-function`}>
                        <button className="btn create-btn margin">Удалить календарь</button>
                    </div>
                </div>
            </div>
            {isModal && (
                <GetTeam
                    isModal={isModal}
                    handleModalClick = {handleModalClick}
                    isAnimating={isAnimating}
                />
            )}
        </div>
    );
}

export default AdminPanel;
