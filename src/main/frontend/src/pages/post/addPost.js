import React, { useState, useRef, useEffect } from 'react';
import '../../css/addPost.scss';

function AddPost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [image, setImage] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false); // Состояние для отслеживания загрузки
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const maxLength = 512;

    const handleChange = (event) => {
        setMessage(event.target.value);
    };
    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Сбрасываем высоту
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Устанавливаем новую высоту
        }
    };

    useEffect(() => {
        adjustHeight(); // Вызываем функцию при изменении сообщения
    }, [message]);

    const handleOpenModal = () => {
        setIsAnimating(false);
        setIsModalOpen(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 50); // Небольшая задержка для начала ��нимации
    };


     const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Устанавливаем загруженное изображение в состояние
                setIsUploaded(true); // Устанавливаем состояние загрузки в true
            };
            reader.readAsDataURL(file);
        }
    };


    const handleCloseModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300); // Задержка, ��тобы дать время анимации завершиться
    };

    const handleModalClick = (e) => {
        // Проверяем, был ли клик вне modalContent
        if (e.target.classList.contains('modal')) {
            handleCloseModal();
        }
    };

    return (
        <div className="addPost">
            <button className="addButton" onClick={handleOpenModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                    <g id="Edit / Add_Plus">
                        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
                add post
            </button>

            {isModalOpen && (
                <div className={`modal ${isAnimating ? 'show' : ''}`} onClick={handleModalClick}>
                    <div className={`modalContent ${isAnimating ? 'show' : ''}`}>
                        <span className="close" onClick={handleCloseModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                               <g id="Edit / Add_Plus">
                                   <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                               </g>
                           </svg>
                        </span>
                        <form className="container-form">
                            <div className={`border-gradient ${isUploaded ? 'uploaded' : ''}`}>
                                <div className="upload-an-image">
                                    {!isUploaded && ( // Показываем только если изображение не загружено
                                        <>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="16.5" y1="0.5" x2="16.5" y2="31.5" stroke="url(#paint0_linear_0_1)" strokeLinecap="round"/>
                                                <line x1="31.5" y1="16.5" x2="0.5" y2="16.5" stroke="url(#paint1_linear_0_1)" strokeLinecap="round"/>
                                                <defs>
                                                    <linearGradient id="paint0_linear_0_1" x1="16" y1="16" x2="15" y2="16" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#76D7C9"/>
                                                        <stop offset="1" stopColor="#75F5C5"/>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_0_1" x1="16" y1="16" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#76D7C9"/>
                                                        <stop offset="1" stopColor="#75F5C5"/>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <input
                                                id="formImage"
                                                type="file"
                                                name="image"
                                                className="form_input"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </>
                                    )}
                                    {image && (
                                        <>
                                            <img src={image} alt="Uploaded" style={{ borderRadius: '10px', height: 'auto', maxWidth: '100%' }} />
                                            <p className="upload" onClick={() => {
                                                setImage(null);
                                                setIsUploaded(false); // Устанавливаем isUploaded в false, когда изображение заменяется
                                            }}>Заменить изображение</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="upload"> Upload in image</p>
                            <div className="border-gradient">
                                <div className="commentContainer">
                                    <textarea
                                        id='fromComment'
                                        className="form_input-comm"
                                        placeholder="Comment"
                                        ref={textareaRef}
                                        value={message}
                                        onChange={handleChange}
                                        rows="1" // Начальная высота
                                        cols="50"
                                        maxLength={maxLength}
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none',
                                            width: '100%',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            outline: 'none' // Убираем обводку при фокусе
                                        }}
                                    />
                                    <div className='comment-counter'>{message.length} / {maxLength}</div>
                                </div>
                            </div>
                            <button className="button-from">SUBMIT</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPost;
