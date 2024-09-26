import { Link } from "react-router-dom";
import React from "react";

function Day({ item, suffix, dayNumber, role, onEditDay,handleDayClick}) {
    const handleEditClick = (event) => {
        event.preventDefault();
        onEditDay(item.day.id);
        handleDayClick(dayNumber);
    };


    return (
        <div className={`calendar-day ${item.status}`}>
            <Link to={`/calendar/${item.day.id}`} className='day-link'>
                <div key={item.day.id} className='day'>
                    <p className="no-wrap"><strong>{dayNumber}<sup className="superscript">{suffix}</sup> day</strong></p>
                    <p>{item.status}</p>
                </div>
                <div className='task'><p>{item.day.id}</p></div>
                <div className='data'>
                    <div className='dataDay'>
                        <p>{item.day.date}</p>
                    </div>
                </div>
            </Link>
            {(role === "curator" && item.status !== "active") && (
                <div className="button-edit-day">
                    <button
                        className="btn create-btn "
                        style={{ padding: '10px 20px'}}
                        onClick={handleEditClick}
                    >
                        edit
                    </button>
                </div>
            )}
        </div>
    );
}

export default Day;
