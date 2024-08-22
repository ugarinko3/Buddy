import React, { useState, useRef, useEffect } from 'react';
import { submitPost } from '../../store/slice/addPostSlice'; // Import the API function
import '../../css/addPost.scss';
import { getCookie } from '../cookie/getCookie.js'
import { formatDate } from './dateFun.js'


function AddPost() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const textareaRef = useRef(null);
    const maxLength = 512;

    const handleChange = (event) => {
        setMessage(event.target.value);
        setError('');
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
            setImage(file); // Store the file object directly
            setFileName(file.name);
            setIsUploaded(true);
        }
    };

    const handleCloseModal = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setImage(null);
            setFileName('');
            setIsUploaded(false);
            setMessage('');
            setError('');
        }, 300);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            handleCloseModal();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isUploaded) {
            setError('Please, upload an image');
            return;
        } else if (!message.trim()) {
            setError('Please, enter a comment.');
            return;
        }

       const now = new Date(); // Получаем текущую дату и время
       const formattedDate = formatDate(now);

       // Создаем объект с данными
       const postData = new FormData();
       postData.append('teamName', 'Team A');
       postData.append('likes', 0);
       postData.append('date', formattedDate); // Дата в формате "dd-MM-yyyy HH:mm"
       postData.append('teamNumber', 1);
       postData.append('urlAvatar', 'http://example.com/avatar.jpg');
       postData.append('photo', await getBase64(image)); // Преобразуем изображение в base64
       postData.append('comment', message);
       postData.append('curator', getCookie('login')); // Получаем куки

       try {
           // Отправляем POST-запрос с данными в формате FormData
           const response = await fetch('post/add-post-in-curator', {
               method: 'POST',
               body: postData,
           });

           const result = await response.json();
           console.log('Success:', result);

           // Закрываем модальное окно после успешной отправки
           handleCloseModal();
       } catch (error) {
           console.error('Error:', error);
           setError('There was an error submitting the form.');
       }


       // Функция для преобразования изображения в base64
       function getBase64(file) {
           return new Promise((resolve, reject) => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onload = () => resolve(reader.result);
               reader.onerror = error => reject(error);
           });
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
                                            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ borderRadius: '10px', height: 'auto', maxWidth: '100%' }} />
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
