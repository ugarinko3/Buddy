import React, {useState, useEffect} from 'react';
import "../../css/mini-calendar.scss";

const MiniCalendar = ({calendarDayStatus = []}) => {
    const [currentDate, setCurrentDate] = useState(new Date()); // Текущая дата
    const [days, setDays] = useState([]);

    useEffect(() => {
        generateCalendar(currentDate);
    }, [currentDate]);

    const generateCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        let daysArray = [];
        for (let i = 1; i <= lastDateOfMonth; i++) {
            daysArray.push(i);
        }

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.unshift('');
        }

        const totalDaysInGrid = Math.ceil((daysArray.length) / 7) * 7;
        const emptyDaysCount = totalDaysInGrid - daysArray.length;
        for (let i = 0; i < emptyDaysCount; i++) {
            daysArray.push('');
        }
        setDays(daysArray);
    };

    const getDayStatus = (day) => {
        if (!day) return null;

        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const statusObj = calendarDayStatus.find(item => item.date === dateString);

        return statusObj ? statusObj.status : null;
    };

    return (
        <div className="calendar-container-mini">
            <div className="calendar-header-mini">
                <button
                    className={`btn create-btn mrc-1`}
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                >
                    Prev
                </button>
                <h2>{currentDate.toLocaleString('en-US', {month: 'long'})} {currentDate.getFullYear()}</h2>
                <button
                    className={`btn create-btn mrc-1`}
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                >
                    Next
                </button>
            </div>
            <div className={`line`}></div>

            <div className="calendar-grid-mini">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={index} className="calendar-day-name">{day}</div>
                ))}

                {days.map((day, index) => {
                    const dayStatus = getDayStatus(day);
                    return (
                        <div
                            key={index}
                            className={`calendar-day-mini ${day ? '' : 'empty'} ${index % 7 === 0 || index % 7 === 6 ? 'weekend' : ''} ${dayStatus || ''}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MiniCalendar;