import '../css/calendar.scss';
import React from 'react';
import Burger from './header_burger';
import {Link}from 'react-router-dom';

function Calendar () {
    const calendarData = {
            "calendar": [
                {
                    "day": ['1', 'st'],
                    "task": "Завершить отчет по проекту  дадададададдадададада ываыввавыа",
                    "data_time": "12 December 2024",
                    "activity": "active",
                },
                {
                    "day": ['2', 'nd'],
                    "task": "Подготовить презентацию для совещания дадададдадададада ыаываывавы",
                    "data_time": "12 December 2024",
                    "activity": "progress"
                },
                {
                    "day": ['3', 'rd'],
                    "task": "Подготовить презентацию для совещания дадададададдадада ыыаыва ыаыва ы",
                    "data_time": "12 December 2024",
                    "activity": "progress"
                },
                {
                    "day": ['4', 'th'],
                    "task": "Подготовить презентацию для совещания ддадададададдада авыавыаывааываыва",
                    "data_time": "12 December 2024",
                    "activity": ""
                },
                {
                    "day": ['5', 'th'],
                    "task": "",
                    "data_time": "12 December 2024",
                    "activity": "no-active"
                },
                {
                    "day": ['6', 'th'],
                    "task": "",
                    "data_time": "12 December 2024",
                    "activity": "no-active"
                },
                {
                    "day": ['7', 'th'],
                    "task": "",
                    "data_time": "12 December 2024",
                    "activity": "no-active"
                },
                {
                    "day": ['8', 'th'],
                    "task": "",
                    "data_time": "12 December 2024",
                    "activity": "no-active"
                }
            ]
    }
    calendarData['calendar'].forEach(item => {
        if (item.activity != 'no-active') item.link = "/calendar-day-" + item.day[0];
    });
    return (
        <div>
            <Burger />
            <div className='calendar'>
                <div className='calendar-container'>
                    {calendarData && (
                        calendarData.calendar.map((day, index) => (
                            <Link to={day.link} key={index} className={`calendar-day ${day.activity}`}>
                                <div className='day'>
                                    <p><strong>{day.day[0]}<sup className="superscript">{day.day[1]}</sup> day</strong></p>
                                </div>
                                <div className='task'><p>{day.task}</p></div>
                                <div className='data'><p>{day.data_time}</p></div>
                                
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}


export default Calendar;