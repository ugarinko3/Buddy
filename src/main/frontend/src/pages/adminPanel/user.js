
function User ({index,
                   itemParticipants,
                   imageLoading,
                   setImageLoading,
                   bool,
                   onClickOpenWindow}) {
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
                {bool && (
                    <div className={`delete-user margin-left`} onClick={() => onClickOpenWindow(itemParticipants.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24"
                             fill="none" >
                            <circle cx="12" cy="12" r="10" stroke="#cf2828" stroke-width="1.5"/>
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#cf2828" stroke-width="1.5"
                                  stroke-linecap="round"/>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;