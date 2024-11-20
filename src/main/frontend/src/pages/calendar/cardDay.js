import React from "react";

function CardDay({item, dayNumber, suffix}) {

    return (
        <div className='day-link'>
            <div key={item.day.id} className='day'>
                <p className={`fon-status`}><strong>{dayNumber}<sup className="superscript">{suffix}</sup> day</strong>
                </p>
                <p className={`fon-status ${item.status}`}>{item.status}</p>
            </div>
            <div className='task'><p>{item.day.comment}</p></div>
            <div className='data'>
                <div className='dataDay'>
                    <p>{item.day.date}</p>
                </div>
            </div>
        </div>
    );
}

export default CardDay;