import '../../css/calendar.scss';
import React, {useEffect, useState} from 'react';
import CreateDaysForm from './createDay';
import Burger from '../header/header_burger';
import Modal from './modalWindowPeriod';
import {Link}from 'react-router-dom';
import {fetchCalendar} from "../../store/slice/calendarSlice";
import AddPost from "../post/addPost";

import {useDispatch, useSelector} from "react-redux";
import {useCheckToken} from "../token/token";
import Post from "../post/post";
import Day from "./day";
import Loading from "../loading/loading";
import ModalWindowComment from "./modalWindowComment";

function Calendar () {
    const dispatch = useDispatch();
    const {login, role, create } = useCheckToken();
    const [dayWindow, setDayWindow] = useState(null);
    const { day, error, loading} = useSelector((state) => state.calendar);
    const [calendar, setCalendar] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // состояние для модального окна
    const[isModalOpenComment, setIsModalComment] = useState(false);
    function getOrdinalSuffix(number) {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = number % 100;
        return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    }

    // useEffect()
    useEffect(() => {
        if (login) {
            const loadCalendar = async () => {
                try {
                    await dispatch(fetchCalendar(login));
                } catch (error) {
                    console.error('Failed to fetch calendars:', error.message);
                }
            };

            loadCalendar();
        }
    }, [dispatch, login]);

    const editDay = (number) => {
        setIsModalComment(true);
        setCalendar(number);
    };
    const handleDayClick = (dayNumber) => {
        setDayWindow(dayNumber);
    };
    const closeEditDay = () => {
        setIsModalComment(false); // Закрываем модальное окно
    };

    const createCalendar = () => {
        setIsModalOpen(true); // Открываем модальное окно при клике
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрываем модальное окно

    };
    if (loading && day.length === 0) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <Burger />
            <div className='calendar'>
                {(role === 'curator' && create === false) && (
                    <div className='button-create-calendar-day'>
                        <button onClick={createCalendar}><p>Создать календарь</p></button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}/>
                    </div>
                )}
                <div className='calendar-container'>
                    {day.map((item, index) => {
                        const dayNumber = index + 1;
                        const suffix = getOrdinalSuffix(dayNumber);

                        return (
                            <Day
                                key={item.day.id}
                                item={item}
                                suffix={suffix}
                                dayNumber={dayNumber}
                                role ={role}
                                onEditDay={editDay}
                                handleDayClick={handleDayClick}
                            />
                        );
                    })}
                </div>
            </div>
            <ModalWindowComment
                isOpen={isModalOpenComment}
                onClose={closeEditDay}
                item={calendar}
                day={dayWindow}
            />
        </div>
    );
}


export default Calendar;