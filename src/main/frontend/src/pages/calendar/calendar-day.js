import '../../css/calendar.scss';
import React from 'react';

    

function Calendar_day(){
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
            }
        ]
    }
    return(
        <div className='day width'>
            <div className='container-day'>

            </div>
        </div>
    )
}

export default Calendar_day;