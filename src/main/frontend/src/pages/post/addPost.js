import React, { useState, useRef, useEffect } from 'react';
import '../../css/addPost.scss';

function AddPost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(''); // Состояние для хранения сообщения об ошибке
    const textareaRef = useRef(null);
    const maxLength = 512;

    const handleChange = (event) => {
        setMessage(event.target.value);
        setError(''); // Сбрасываем ошибку при изменении текста
    };

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [message]);

    const handleOpenModal = () => {
        setIsAnimating(false);
        setIsModalOpen(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 50);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFileName(file.name);
                setIsUploaded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsModalOpen(false);
            // Сбрасываем состояние при закрытии модального окна
            setImage(null);
            setFileName('');
            setIsUploaded(false);
            setMessage('');
            setError(''); // Сбрасываем ошибку
        }, 300);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            handleCloseModal();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        if (!isUploaded) {
            setError('Please, upload an image'); // Устанавливаем сообщение об ошибке
            return; // Выходим из функции, если изображение не загружено
        } else if (!message.trim()) {
            setError('Please, enter a comment.'); // Устанавливаем сообщение об ошибке
            return; // Выходим из функции, если сообщение пустое
        }


        // Здесь можно добавить логику для отправки данных
        console.log('Submitted:', { message, image, fileName });

        // После успешной отправки можно сбросить состояние
        handleCloseModal();
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
                        <form className="container-form" onSubmit={handleSubmit}>
                            <div className={`border-gradient ${isUploaded ? 'uploaded' : ''}`}>
                                <div className="upload-an-image">
                                    {!isUploaded && (
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
                                                setFileName('');
                                                setIsUploaded(false);
                                            }}>Заменить изображение</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="upload">
                                {isUploaded ? 'Файл: ' + fileName : 'Upload in image'}
                            </p>
                            <div className="border-gradient">
                                <div className="commentContainer">
                                    <textarea
                                        id='fromComment'
                                        className="form_input-comm"
                                        placeholder="Comment"
                                        ref={textareaRef}
                                        value={message}
                                        onChange={handleChange}
                                        rows="1"
                                        cols="50"
                                        maxLength={maxLength}
                                        style={{
                                            overflow: 'hidden',
                                            resize: 'none',
                                            width: '100%',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            outline: 'none'
                                        }}
                                    />
                                    <div className='comment-counter'>{message.length} / {maxLength}</div>
                                </div>
                            </div>
                            {error && (
                                <div className="error">
                                    <p className="error-message">{error}</p>
                                    <div className="error-icon">⚠️</div>
                                </div>
                            )}
                            <button className="button-from" type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPost;
