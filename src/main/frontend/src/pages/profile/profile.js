import React, {useEffect, useState} from 'react';
import '../../css/profile.scss';
import Burger from '../header/header_burger';
import {fetchCreateGoal, fetchDeleteGoal, fetchStatusGoal, fetchUser} from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import CreateGoal from "./createGoal";
import MiniCalendar from "./mini-calendar";
import Loading from "../loading/loading";
import Error from "../error/error";
import ListTeam from "../adminPanel/listTeam"; // Импортируйте useParams

function Profile() {
    const { userName } = useParams(); // Получите параметр login из URL
    // const [activeIndex, setActiveIndex] = useState(null); // Отслеживание активного индекса
    const [imageLoading, setImageLoading] = useState({ avatar: true });
    const dispatch = useDispatch();
    const { login } = useSelector((state) => state.token);
    const { days, user, team, goals,  error} = useSelector((state) => state.profile);
    const [message, setMessage] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [modalWindow, setModalWindow] = useState(false);
    const isUserLoggedIn = user?.login && login === user?.login;
    const successDaysCount = days.filter(item => item.status === "Success").length;
    const percentage =  Math.round((successDaysCount / days.length) * 100);

    // const toggleAnswer = (index) => {
    //     setActiveIndex(activeIndex === index ? null : index); // Переключение активного индекса
    // };
    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


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
                                    {imageLoading.avatar && <div className='loader profile-loader'></div>}
                                    <img
                                        src={user.urlAvatar}
                                        alt={`${user.login} avatar`}
                                        onLoad={() => setImageLoading(prev => ({...prev, avatar: false}))}
                                        onError={() => setImageLoading(prev => ({...prev, avatar: false}))}
                                        style={{display: imageLoading.avatar ? 'none' : 'block'}}/>
                                </div>
                                <div className={`role ${user.role}`}><p className={`top-1`}>{user.role}</p></div>
                                <div className="profile-name">
                                    <h2 className={`username-profile`}>{userName}@student.21-school.ru</h2> {/* Исправлено здесь */}
                                    <p className={`core-programm`}>{user.coreProgramm}</p>
                                </div>
                                <div className="profile-progress">
                                    <div className="profile-progress-day">
                                        <div className="completed-days">
                                            <p>{successDaysCount}/{days.length}</p>
                                        </div>
                                        <div className="percentage-of-days">
                                            <p>{percentage}%</p>
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress">
                                            <div className="progress-bar-inner" style={{width: `${percentage}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-active">
                                    <div className="token">{user.token} TOKEN</div>
                                    <div className="xp">{user.xp} XP</div>
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
                                        <div className={`no-goals`}>No goals available</div> // Сообщение, если нет целей
                                    )}
                                    {isUserLoggedIn && (
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
                                {team && team.length > 0 ? (
                                    team.map((item, index) => (
                                    <ListTeam
                                        key={index} // Добавление уникального ключа
                                         activeIndex={activeIndex}
                                         toggleAnswer={toggleAnswer}
                                         index={index}
                                         item={item}
                                         imageLoading={imageLoading}
                                         setImageLoading={setImageLoading}
                                         bool={true}
                                    />
                                    ))
                                ):(
                                    <div className={`no-goals no-team`}>
                                        <p>The user does not have a command</p>
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
