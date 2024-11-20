import React from "react";


function NoInfo({message}) {
    return (
        <div className={`no-goals`}>
            <p>{message}</p>
        </div>
    );
}

export default NoInfo;