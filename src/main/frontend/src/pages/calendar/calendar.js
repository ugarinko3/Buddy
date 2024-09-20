import '../../css/calendar.scss';
import React, {useEffect} from 'react';
import Burger from '../header/header_burger';
import Loading from '../loading/loading';
import {fetchCalendar} from "../../store/slice/calendarSlice";
import {getCookie} from "../cookie/getCookie";
import {useDispatch, useSelector} from "react-redux";

function Calendar () {
    const dispatch = useDispatch();
    const { calendar, error, loading} = useSelector((state) => state.day);

    const login = getCookie('login').split('@')[0];

    // const userRole  =
    useEffect(() => {
        const loadData = async () => {
            try {
                await dispatch(fetchCalendar(login));
            } catch (error) {
                console.error(error.message);
            }
        };

        loadData();
    }, [dispatch, login]);


    if (loading && calendar.length === 0) return <Loading />;
    if (error) return <p>Error: {error.message || error}</p>;

    return (
        <div>
            <Burger />
            <div className='calendar'>
                <div className='calendar-container'>
                </div>
            </div>
        </div>
    );
}


export default Calendar;