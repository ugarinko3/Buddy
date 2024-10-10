import React from "react";


function User ({index,
                   itemParticipants,
                   imageLoading,
                   setImageLoading}) {
    return (
        <div
            className={`string-mini-info gradient-border border-user-background`} key={index}>
            <div className={`inner-content `}>
                <div className='image'>
                    {imageLoading.avatar &&
                        <div className='loader'></div>}
                    <img
                        src={itemParticipants.urlAvatar}
                        alt={`${itemParticipants.login} Avatar`}
                        onLoad={() => setImageLoading(prev => ({
                            ...prev,
                            avatar: false
                        }))}
                        onError={() => setImageLoading(prev => ({
                            ...prev,
                            avatar: false
                        }))}
                        style={{display: imageLoading.avatar ? 'none' : 'block'}}
                    />
                </div>
                <div className='text-flex'>
                    <h3>{itemParticipants.login} <span></span></h3>
                    <p>{itemParticipants.role}</p>
                </div>
            </div>
        </div>
    );
}

export default User;