import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Burger from "../header/header_burger";
import "../../css/admin.scss"
import {
    fetchCreateCurator,
    fetchDeleteUser,
    fetchAddUser,
    fetchGetExcel,
} from "../../store/slice/adminSlice";
import GetTeam from "./getTeam";
import {fetchGetTeam} from "../../store/slice/teamSlice";
import Modal from "../calendar/modalWindowPeriod";
import ModalWindowUser from "./modalWindowUser";
import ModalWindowAddUser from "./modalWindowAddUser";
import ModalWindowExcel from "./modalWindowExcel";

function AdminPanel() {
    const {error} = useSelector((state) => state.admin);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curatorNickName, setCuratorNickName] = useState(''); // Состояние для никнейма куратора
    const [message, setMessage] = useState(''); // Состояние для сообщения
    const [isError, setIsError] = useState(false); // Состояние для отслеживания ошибок
    const [isModal, setIsModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [openWindow, setOpenWindow] = useState(false);
    const [openWindowUser, setOpenWindowUser] = useState(false);
    const [openWindowExcel, setOpenWindowExcel] = useState(false);
    const [deleteUser, setDeleteUser] = useState('');
    const [idTeam, setIdTeam] = useState();
    // const [season, setSeason] = useState(null);
    const [role, setRole] = useState("user")
    const dispatch = useDispatch();


    const handleCuratorInputChange = (event) => {
        setCuratorNickName(event.target.value);
        setMessage(''); // Сбрасываем сообщение при вводе
        setIsError(false); // Сбрасываем состояние ошибки
    };
    const handleRole = (event) => {
        setRole(event.target.value);
        setMessage(''); // Сбрасываем сообщение при вводе
        setIsError(false); // Сбрасываем состояние ошибки
    };
    const onClickOpenWindowUser = (team) => {
        if (openWindowUser) {
            setOpenWindowUser(false)
        } else {
            setIdTeam(team);
            setOpenWindowUser(true);
        }
    }

    const onClickOpenWindow = (id) => {
        if (openWindow) {
            setOpenWindow(false)
        } else {
            setDeleteUser(id);
            setOpenWindow(true);
        }
    }


    const handleSubmitCurator = async (event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        try {
            await fetchCreateCurator(curatorNickName, role);
            setMessage("Роль изменена успешно!"); // Устанавливаем сообщение
            setCuratorNickName(''); // Сбрасываем поле ввода
            setIsError(false); // Устанавливаем состояние успешного выполнения
        } catch (error) {
            setMessage("Ошибка при изменение роли."); // Устанавливаем сообщение об ошибке
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
        if (!openWindow) {
            if (e.target.classList.contains('modal')) {
                handleCloseModal();
            }
        }
    };

    const clickExcel = () => {
        try {
            dispatch(fetchGetExcel());
            setOpenWindowExcel(true);
        } catch (error) {
            setMessage("Ошибка при попытки узнать данные сезона")
            setIsError(true);
        }
    }
    const closeWindowExcel = () => {
        setOpenWindowExcel(false);
    }
    const clickDeleteUser = (id) => {
        setOpenWindow(false);
        fetchDeleteUser(id);
        dispatch(fetchGetTeam());
    }
    const clickAddUser = async (idTeam, login) => {
        const result = await dispatch(fetchAddUser(idTeam, login));
        if (result.success) {
            setOpenWindowUser(false);
            dispatch(fetchGetTeam());
        }
    };

    const createSeason = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`main`}>
            <Burger/>
            <div className={`container-main-news`}>
                <div className={`panel-admin`}>
                    <div className={`create-role center`}>
                        {/*<div className={`container-function`}>*/}
                        {/*    <button className={`btn create-btn margin`} onClick={clickCommand}>Сгенерировта команды*/}
                        {/*    </button>*/}
                        {/*</div>*/}
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
                            <label className={`label-left`}> Изменение роли</label>
                            <label className={`label-left container-width-panel wh-120`}>Введите никнейм</label>
                            <input
                                className={`nick-name container-width-panel`}
                                value={curatorNickName}
                                onChange={handleCuratorInputChange}
                            />
                            <label className={`label-left container-width-panel wh-120`}>Введите роль</label>
                            <select className={`custom-select container-width-panel wh-121`} onChange={handleRole}>
                                <option>user</option>
                                <option>curator</option>
                                <option>admin</option>
                            </select>
                            <button className={`btn create-btn btn-top container-width-panel`} type="submit">Назначить
                                куратора
                            </button>
                        </form>
                    </div>
                    <div className={`create-role`}>
                        <div className={`container-function`}>
                            <button className="btn create-btn margin" onClick={clickExcel}>Выгрузить данные сезона
                            </button>
                        </div>
                        <div className={`container-function`}>
                            <button className={`btn create-btn margin`} onClick={createSeason}>Создать сезон</button>
                        </div>
                        <Modal isOpen={isModalOpen} onClose={closeModal} setMessage={setMessage}/>
                    </div>
                </div>
            </div>
            {isModal && (
                <GetTeam
                    isModal={isModal}
                    handleModalClick={handleModalClick}
                    isAnimating={isAnimating}
                    bool={true}
                    onClickOpenWindow={onClickOpenWindow}
                    onClickOpenWindowUser={onClickOpenWindowUser}
                />
            )}
            {openWindow && (
                <ModalWindowUser
                    onClickOpenWindow={onClickOpenWindow}
                    clickDeleteUser={clickDeleteUser}
                    id={deleteUser}
                />
            )}
            {openWindowUser && (
                <ModalWindowAddUser
                    onClickOpenWindowUser={onClickOpenWindowUser}
                    clickAddUser={clickAddUser}
                    team={idTeam}
                    error={error}
                />
            )}
            {openWindowExcel && (
                <ModalWindowExcel
                    closeWindowExcel={closeWindowExcel}
                />
            )}

        </div>
    );
}

export default AdminPanel;
