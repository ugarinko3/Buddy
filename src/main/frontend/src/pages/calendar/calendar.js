import '../../css/calendar.scss';
import React, { useEffect, useState } from 'react';
import Burger from '../header/header_burger';
import { fetchCalendar } from "../../store/slice/calendarSlice";
import { useDispatch, useSelector } from "react-redux";
import Day from "./day";
import Loading from "../loading/loading";
import ModalWindowComment from "./modalWindowComment";
import Error from "../error/error";
import RegistrationSeasonNews from "../post/registrationSeason";
import {Season} from "../../store/slice/seasonSlice";

function Calendar() {
    const dispatch = useDispatch();
    const {season, dateSeason} = useSelector((state) => state.season);
    const {login, role}  = useSelector((state) => state.token);
    const [dayWindow, setDayWindow] = useState(null);
    const { day, error, loading } = useSelector((state) => state.calendar);
    const [isModalOpenComment, setIsModalComment] = useState(false);
    const [calendar, setCalendar] = useState(null);
    const [filter, setFilter] = useState('all'); // Состояние для фильтрации
    const [activeFilter, setActiveFilter] = useState('all');


    useEffect(() => {
        if (login) {
            if ((!Array.isArray(day) || day.length === 0) && season !== null ) {
                dispatch(fetchCalendar(login));
            } else {
                dispatch(Season(login));            }
        }
    }, [login, day, dispatch]);

    function getOrdinalSuffix(number) {
        const suffixes = ["th", "st", "nd", "rd"];
        const value = number % 100;
        return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
    }

    const editDay = (number) => {
        setIsModalComment(true);
        setCalendar(number);
    };

    const handleDayClick = (dayNumber) => {
        setDayWindow(dayNumber);
    };

    const closeEditDay = () => {
        setIsModalComment(false);
    };


    // Фильтрация дней по статусу
    const filteredDays = Array.isArray(day)
        ? day.filter(item => {
            if (filter === 'Success') return item.status === 'Success';
            if (filter === 'Process') return item.status === 'Process';
            if (filter === 'active') return item.status === 'active';
            if (filter === 'Fail') return item.status === 'Fail';
            return true;
        })
        : [];
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setFilter(filter);
    };

    if (loading) return <Loading />;
    if (error) return <Error />;
    return (
        <div>

            <Burger />
            <div className='calendar'>
                <div className={`link-name`}>
                    <h2>Calendar</h2>
                </div>
                <ul className="header-list padding-list header">
                    {['All', 'Success', 'Process', 'active', 'Fail'].map((filter) => (
                        <li
                            key={filter}
                            className={`header-link ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter === 'active' ? 'Active' : filter}
                        </li>
                    ))}
                </ul>
                {role === "admin" || season.status === "Action" ? (
                    <div className='calendar-container'>
                        {filteredDays.length > 0 && (
                            filteredDays.map((item, index) => {
                                const dayNumber = index + 1;
                                const suffix = getOrdinalSuffix(dayNumber);

                                return (
                                    <Day
                                        key={item.day.id}
                                        item={item}
                                        suffix={suffix}
                                        dayNumber={dayNumber}
                                        role={role}
                                        onEditDay={editDay}
                                        handleDayClick={handleDayClick}
                                    />
                                );
                            })
                        )}
                    </div>
                ):(
                    <RegistrationSeasonNews
                        dateSeason={dateSeason}
                    />
                )}
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