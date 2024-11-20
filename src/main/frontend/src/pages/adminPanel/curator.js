import React from "react";

function Curator({toggleAnswer, index, item, imageLoading, setImageLoading, bool}) {
    return (
        <div>
            <div className='string-mini-info gradient-border border-curator-background'
                 onClick={() => {
                     if (bool) {
                         toggleAnswer(index);
                     }
                 }}>
                <div className='inner-content'>
                    <div className='image'>
                        {imageLoading.avatar && <div className='loader'></div>}
                        <img
                            src={item.urlAvatar}
                            alt={`${item.login} Avatar`}
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
                        <h3>{item.login} <span></span></h3>
                        <p>{item.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Curator;
