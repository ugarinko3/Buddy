import React from "react";


function NameTitle ({name, index}) {
    return (
        <div className={`name-title`} key={index}>
            <h2 className={`ft108`}>{name}</h2>
            <div className={`line`}></div>
        </div>
    );
}

export default NameTitle;