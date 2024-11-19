import React from "react";


function NameTitle ({name}) {
    return (
        <div className={`name-title`}>
            <h2 className={`ft108`}>{name}</h2>
            <div className={`line`}></div>
        </div>
    );
}

export default NameTitle;