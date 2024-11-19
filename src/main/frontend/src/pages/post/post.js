import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from './dateFun.js';
import { useSelector } from "react-redux";

function Post({
                  item,
                  handleLikePost,
                  handleDeletePost,
                  usePostDayUser,
                  functionStatus
              }) {
    const [imageLoading, setImageLoading] = useState({ image: true, avatar: true });
    const { login, role } = useSelector((state) => state.token);
    const [loadingStatus, setLoadingStatus] = useState({
        fail: false,
        success: false
    });
    const [likeScale, setLikeScale] = useState(false);  // Состояние для анимации масштаба

    const handleLikeClick = () => {
        setLikeScale(true); // Включаем анимацию
        handleLikePost(item);  // Выполняем функцию лайка

        // Через 300 мс (время анимации) сбрасываем масштаб
        setTimeout(() => setLikeScale(false), 300);
    };

    const handleFailStatus = async () => {
        setLoadingStatus(prev => ({ ...prev, fail: true }));
        const updatedPost = { ...item, status: "fail" };
        await functionStatus(updatedPost);
        setLoadingStatus(prev => ({ ...prev, fail: false }));
    };

    const handleSuccessStatus = async () => {
        setLoadingStatus(prev => ({ ...prev, success: true }));
        const updatedPost = { ...item, status: "successes" };
        await functionStatus(updatedPost);
        setLoadingStatus(prev => ({ ...prev, success: false }));
    };


    return (
        <div key={item.id} className={`post`}>
            <div className='NameBuddy'>
                <div className='profile-public-news'>
                    <div className='image-news-avatar'>
                        {imageLoading.avatar && (
                            <div className={`container-loader`}>
                                <div className={'loader'}></div>
                            </div>
                        )}
                        <img
                            src={item.urlAvatar}
                            alt={`${item.teamName} Avatar`}
                            onLoad={() => setImageLoading(prev => ({ ...prev, avatar: false }))}
                            onError={() => setImageLoading(prev => ({ ...prev, avatar: false }))}
                            style={{ display: imageLoading.avatar ? 'none' : 'block' }}
                        />
                    </div>
                    <div className='name-curator-a-href'>
                        <h3>{item.teamName}</h3>
                        <p>{item.nameTeam}</p>
                    </div>
                </div>
                <div className='date-container'>
                    {!usePostDayUser && (role === 'admin' || (role === 'curator' && login === item.login)) && (
                        <span className='delete-icon' onClick={() => handleDeletePost(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                                <path
                                    d="M14.2792,2 C15.1401,2 15.9044,2.55086 16.1766,3.36754 L16.7208,5 L20,5 C20.5523,5 21,5.44772 21,6 C21,6.55227 20.5523,6.99998 20,7 L19.9975,7.07125 L19.1301,19.2137 C19.018,20.7837 17.7117,22 16.1378,22 L7.86224,22 C6.28832,22 4.982,20.7837 4.86986,19.2137 L4.00254,7.07125 C4.00083,7.04735 3.99998,7.02359 3.99996,7 C3.44769,6.99998 3,6.55227 3,6 C3,5.44772 3.44772,5 4,5 L7.27924,5 L7.82339,3.36754 C8.09562,2.55086 8.8599,2 9.72076,2 L14.2792,2 Z M17.9975,7 L6.00255,7 L6.86478,19.0712 C6.90216,19.5946 7.3376,20 7.86224,20 L16.1378,20 C16.6624,20 17.0978,19.5946 17.1352,19.0712 L17.9975,7 Z M10,10 C10.51285,10 10.9355092,10.386027 10.9932725,10.8833761 L11,11 L11,16 C11,16.5523 10.5523,17 10,17 C9.48715929,17 9.06449214,16.613973 9.00672766,16.1166239 L9,16 L9,11 C9,10.4477 9.44771,10 10,10 Z M14,10 C14.5523,10 15,10.4477 15,11 L15,16 C15,16.5523 14.5523,17 14,17 C13.4477,17 13,16.5523 13,16 L13,11 C13,10.4477 13.4477,10 14,10 Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                    )}
                    <p>{formatDate(item.date)}</p>
                </div>
            </div>
            <div className='image-news'>
                {imageLoading.image && <div className={`container-loader`}><div className='loader'></div></div>}
                <img
                    src={item.urlPostImage}
                    alt={`${item.teamName} Post`}
                    onLoad={() => setImageLoading(prev => ({ ...prev, image: false }))}
                    onError={() => setImageLoading(prev => ({ ...prev, image: false }))}
                    style={{ display: imageLoading.image ? 'none' : 'block' }}
                />
            </div>
            {!usePostDayUser && (
                <div className='like'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ fill: item.liked ? 'red' : 'white', transform: likeScale ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.3s ease' }}
                        onClick={handleLikeClick}
                    >
                        <path
                            d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"/>
                    </svg>
                    <p>{item.likes} Likes</p>
                </div>
            )}
            <div className={`comment ${usePostDayUser}`}>
                <div className='name-patricipant'>
                    <div>
                        <p className='nickName'>
                            Nickname: <Link to={`/profile/${item.login}`}>{item.login}</Link><br />
                        </p>
                        {item.comment}
                    </div>
                    {/*<span onClick={() => showFullText(index)}>more</span>*/}
                </div>
                {(item.status === "Process" && (usePostDayUser && login === item.curator.login)) ? (
                    <div className='button-curator-container'>
                        <button
                            className='btn cancel-btn false-button'
                            onClick={handleFailStatus}
                            disabled={loadingStatus.fail}
                        >
                            {loadingStatus.fail ? (
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 16.3631L1.63688 18L9 10.6369L16.3631 18L18 16.3631L10.6369 9L18 1.63688L16.3631 0L9 7.36312L1.63688 0L0 1.63688L7.36312 9L0 16.3631Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </button>

                        <button
                            className='true-button btn create-btn'
                            onClick={handleSuccessStatus}
                            disabled={loadingStatus.success}
                        >
                            {loadingStatus.success ? (
                                <svg className="spinner" viewBox="0 0 50 50">
                                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                                </svg>
                            ) : (
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3487 0.503235L6.66325 10.1887L1.65005 5.17545L0 6.8255L6.66325 13.4899L17.9999 2.15445L16.3487 0.503235Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                ) : usePostDayUser && (
                    <div className={`fon-status ${item.status} scale`}>
                        <p>{item.status}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Post;