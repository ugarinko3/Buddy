import React, {useEffect, useState} from 'react';
import '../../css/profile.scss';
import Burger from '../header/header_burger';
import {fetchCreateGoal, fetchDeleteGoal, fetchStatusGoal, fetchUser} from "../../store/slice/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import CreateGoal from "./createGoal";
import MiniCalendar from "./mini-calendar";
import Loading from "../loading/loading";
import Error from "../error/error";
import ListTeam from "../adminPanel/listTeam";
import WindowPhoto from "./windowPhoto";
import NameTitle from "./nameTitle";
import ListSeason from "./listSeason";
import NoInfo from "./noInfo";

function Profile() {
    const {userName} = useParams();
    const [imageLoading, setImageLoading] = useState({avatar: true});
    const dispatch = useDispatch();
    const {login} = useSelector((state) => state.token);
    const {days, user, team, goals, error, loading} = useSelector((state) => state.profile);
    const [message, setMessage] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);
    const [modalWindow, setModalWindow] = useState(false);
    const [modalWindowPhoto, setModalWindowPhoto] = useState(false);
    const isUserLoggedIn = user?.login && login === user?.login;
    const successDaysCount = days.filter(item => item.status === "Success").length;
    const percentage = Math.round((successDaysCount / days.length) * 100);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    useEffect(() => {
        dispatch(fetchUser(userName));
    }, [userName, dispatch]);

    const reloadProfile = () => {
        handeCloseModal();
        dispatch(fetchUser(userName));
    }

    if (loading) {
        return <Loading/>;
    }
    const handleReplacePhoto = () => {
        setModalWindowPhoto(true);
    };


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
    const handeCloseModal = () => {
        if (modalWindowPhoto) {
            setModalWindowPhoto(false);
        } else {
            setModalWindowPhoto(true);
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
            await dispatch(fetchStatusGoal(goal));
            dispatch(fetchUser(userName));
        } catch (error) {
            console.error('Failed to change goal status:', error.message);
        }
    };
    if (error) return <Error/>;
    return (
        <div>
            <Burger/>
            <div className={`profile`}>
                <div className={`lvl_1`}>
                    <div className={`profileInfo`}>
                        <div className="profile-cont">
                            <div className="profile-info">
                                <div className={`container-photo`}>
                                    <div className="profile-img">
                                        {imageLoading.avatar && <div className='loader profile-loader'></div>}
                                        <div className={`image-avatar`}>
                                            <img
                                                src={user.urlAvatar}
                                                alt={`${user.login} avatar`}
                                                onLoad={() => setImageLoading(prev => ({...prev, avatar: false}))}
                                                onError={() => setImageLoading(prev => ({...prev, avatar: false}))}
                                                style={{display: imageLoading.avatar ? 'none' : 'block'}}/>
                                            {login === userName && (
                                                <div className="overlay" onClick={handleReplacePhoto}>
                                                    <div className="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100px"
                                                             height="100px"
                                                             viewBox="0 0 24 24" fill="none">
                                                            <circle opacity="0.5" cx="12" cy="12" r="10"
                                                                    stroke="#75F5C5"
                                                                    strokeWidth="1.5"/>
                                                            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                                                                  stroke="#75F5C5" strokeWidth="1.5"
                                                                  strokeLinecap="round"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={`role ${user.role}`}><p className={`top-1`}>{user.role}</p></div>
                                <div className="profile-name">
                                    <h2 className={`username-profile`}>{userName}@student.21-school.ru</h2>
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
                                <NameTitle
                                    name={"Goals"}
                                    index={`goals-title`}
                                />
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
                                        <NoInfo
                                            message={`No goals available`}
                                        />
                                    )}
                                    {isUserLoggedIn && (
                                        <CreateGoal
                                            user={user}
                                            goals={goals}
                                            changeStatus={changeStatus}
                                            handleCreateClick={handleCreateClick}
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
                                <NameTitle
                                    name={"Team"}
                                    index={`team-title`}
                                />
                                {team && team.length > 0 ? (
                                    team.map((item, index) => (
                                        <ListTeam

                                            activeIndex={activeIndex}
                                            toggleAnswer={toggleAnswer}
                                            index={index}
                                            item={item}
                                            imageLoading={imageLoading}
                                            setImageLoading={setImageLoading}
                                        />
                                    ))
                                ) : (
                                    <NoInfo
                                        message={`The user does not have a command`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`lvl_2`}>
                    <div className={`mini-calendar`}>
                        <MiniCalendar
                            calendarDayStatus={days}
                        />
                    </div>
                    <div className={`info-season`}>
                        <div className={`season-profile`}>
                            <NameTitle
                                name={"Season"}
                                index={`season-title`}
                            />
                            <div className={`list-season`}>
                                {user.seasons ? (
                                    user.seasons.map((itemSeason, indexSeason) => (
                                        <ListSeason
                                            season={itemSeason}
                                            index={indexSeason}
                                        />
                                    ))
                                ) : (
                                    <NoInfo
                                        message={`The user does not have a season`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalWindowPhoto && (
                <WindowPhoto
                    reloadProfile={reloadProfile}
                    handeCloseModal={handeCloseModal}
                    login={login}
                />
            )}
        </div>
    );
}

export default Profile;
