import { Link } from "react-router-dom";
import React from "react";
import CardDay from "./cardDay"

function Day({ item, suffix, dayNumber, role, onEditDay,handleDayClick}) {
    const handleEditClick = (event) => {
        event.preventDefault();
        onEditDay(item.day.id);
        handleDayClick(dayNumber);
    };

    return (
        <div className={`calendar-day ${item.status}`}>
            {item.status !== "no-active" ? (
                <Link to={`/calendar/${item.day.id}`}>
                    <CardDay
                        item={item}
                        dayNumber={dayNumber}
                        suffix={suffix}
                    />
                </Link>
            ):(
                <CardDay
                    item={item}
                    dayNumber={dayNumber}
                    suffix={suffix}
                />
            )}
            {(role === "admin") && (
                <div className="button-edit-day">
                    <button
                        className="btn create-btn "
                        style={{ padding: '10px 20px'}}
                        onClick={handleEditClick}
                    >
                        create
                    </button>
                </div>
            )}
        </div>
    );
}

export default Day;
