import React, {useEffect, useState} from 'react';
import '../../css/profile.scss';
import Burger from '../header/header_burger';
import {fetchCreateGoal, fetchDeleteGoal, fetchStatusGoal, fetchUser} from "../../store/slice/profileSlice";
import Curator from "../adminPanel/curator";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import User from "../adminPanel/user";
import CreateGoal from "./createGoal";
import MiniCalendar from "./mini-calendar";
import Loading from "../loading/loading";
import Error from "../error/error"; // Импортируйте useParams

function Profile() {
    const { userName } = useParams(); // Получите параметр login из URL
    // const [activeIndex, setActiveIndex] = useState(null); // Отслеживание активного индекса
    const [imageLoading, setImageLoading] = useState({ image: true, avatar: true });
    const dispatch = useDispatch();
    const { login } = useSelector((state) => state.token);
    const { days, user, team, goals,  error} = useSelector((state) => state.profile);
    const [message, setMessage] = useState('');
    const [modalWindow, setModalWindow] = useState(false);
    const isUserLoggedIn = user?.login && login === user?.login;

    // const toggleAnswer = (index) => {
    //     setActiveIndex(activeIndex === index ? null : index); // Переключение активного индекса
    // };


    useEffect(() => {
            dispatch(fetchUser(userName));
    }, [userName, dispatch]);

    if (!user) {
        return <Loading />;
    }

    const handleCreateClick = async () => {
        const data = {
            title: message,
            user: user,
        }
        try {
            await dispatch(fetchCreateGoal(data));
            dispatch(fetchUser(userName));
        } catch (error) {
            console.error('Failed to fetch comment:', error.message);
        }
        setMessage('');
    }
    const deleteGoal = async (goal) => {
        try {
            await dispatch(fetchDeleteGoal(goal));
            dispatch(fetchUser(userName));
        } catch (error) {
            console.error('Failed to :', error.message);
        }
    }

    const createGoal = () => {
        setModalWindow(true);
    }
    const onClose = () => {
        setModalWindow(false);
    };

    const changeStatus = async (goal) => {
        try {
            await dispatch(fetchStatusGoal(goal)); // Теперь это обновит состояние автоматически
            dispatch(fetchUser(userName));
        } catch (error) {
            console.error('Failed to change goal status:', error.message);
        }
    };
    if (error) return <Error />;
    return (
        <div>
            <Burger />
            <div className="profile" >
                <div className={`lvl_1`}>
                    <div className={`profileInfo`}>
                        <div className="profile-cont">
                            <div className="profile-info">
                                <div className="profile-img">
                                    <img
                                        src='https://firebasestorage.googleapis.com/v0/b/buddy-ea86a.appspot.com/o/avatars%2Favatar_1.png?alt=media&token=d668660e-6835-4c0c-8fff-8bb6c8f093f9'
                                        alt='avatar-profile'></img>
                                </div>
                                <div className={`role ${user.role}`}><p className={`top-1`}>{user.role}</p></div>
                                <div className="profile-name">
                                    <p>{userName}@student.21-school.ru</p> {/* Исправлено здесь */}
                                </div>
                                <div className="profile-team-name">
                                    <p>Team Name</p>
                                </div>
                                <div className="profile-progress">
                                    <div className="profile-progress-day">
                                        <div className="completed-days">
                                            <p>7/30</p>
                                        </div>
                                        <div className="percentage-of-days">
                                            <p>25%</p>
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress">
                                            <div className="progress-bar-inner"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-active">
                                    <div className="token">564 token</div>
                                    <div className="xp">4815 XP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`info-team-goals`}>
                        <div className={`container-info`}>
                            <div className={`mini-info`}>
                                <div className={`name-title`}>
                                    <h2 className={`ft108`}>GOALS</h2>
                                    <div className={`line`}></div>
                                </div>
                                <div className={`list`}>
                                    {goals && goals.length > 0 ? (
                                        goals.map((item, index) => (
                                            <div className={`goal-user ${item.status}`} key={index}>
                                                <div className={`title-goal`}>{item.title}</div>
                                                <input
                                                    className={`checkbox-goal`}
                                                    type="checkbox"
                                                    checked={item.status}
                                                    readOnly
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div>No goals available</div> // Сообщение, если нет целей
                                    )}
                                    { isUserLoggedIn && (
                                        <CreateGoal
                                            user={user}
                                            goals={goals} // Передаем цели
                                            changeStatus={changeStatus}
                                            handleCreateClick={handleCreateClick}// Передаем функцию для изменения статуса
                                            message={message}
                                            setMessage={setMessage}
                                            createGoal={createGoal}
                                            modalWindow={modalWindow}
                                            deleteGoal={deleteGoal}
                                            onClose={onClose}
                                        />
                                    )}
                                </div>

                            </div>
                            <div className={`mini-info`}>
                                <div className={`name-title`}>
                                    <h2 className={`ft108`}>TEAM</h2>
                                    <div className={`line`}></div>
                                </div>

                                {user && user.role === "user" && team && team.length > 0 && (
                                    <div className={`list`} key={user.id}>
                                            <Curator
                                                index={team[0].curator.id}
                                                item={team[0].curator} // Передаем объект куратора
                                                imageLoading={imageLoading}
                                                setImageLoading={setImageLoading}
                                                bool={false}
                                            />
                                            {team[0].participants.map((itemParticipants, i) => (
                                                <User
                                                    index={itemParticipants.id}
                                                    itemParticipants={itemParticipants}
                                                    imageLoading={imageLoading}
                                                    setImageLoading={setImageLoading}
                                                />
                                            ))}
                                        </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`lvl_2`}>
                    {/*<div className={`xz`}></div>*/}
                    <div className={`mini-calendar`}>
                        <MiniCalendar
                            calendarDayStatus={days}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
