import React, { useState, useRef, useEffect } from 'react';
import '../../css/addPost.scss';
import { submitPost, submitPostDay} from "../../store/slice/addPostSlice";
import { fetchTeamList } from "../../store/slice/teamList";
import handleAddPost from "./BorderNews"
import { adjustTextareaHeight, handleCommentChange, getCommentCounter, maxLength } from '../textArea/text';
import {useSelector} from "react-redux";


function AddPost({boolean, idDay}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const [image, setImage] = useState(null);
    const {login, role} = useSelector((state) => state.token) // Use the custom hook
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [teamName, setTeamName] = useState(''); // Инициализируем состояние для выбранной команды
    const [teams, setTeams] = useState([]);
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    let post;



    useEffect(() => {
        adjustTextareaHeight(textareaRef);
    }, [message]);

    const handleOpenModal = () => {
        setIsAnimating(false);
        setIsModalOpen(true);
        setTimeout(() => {
            setIsAnimating(true);
        }, 50);
    };

    const handleTeamChange = (event) => {
        setTeamName(event.target.value); // Обновляем состояние выбранной команды
        setError(''); // Сбрасываем ошибку при выборе команды
        setIsLoading(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const maxSizeInMB = 5; // Максимальный размер в МБ
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Переводим в байты

            if (file.size > maxSizeInBytes) {
                setError(`Файл слишком большой. Максимальный размер: ${maxSizeInMB} МБ.`);
                setImage(null);
                setFileName('');
                setIsUploaded(false);
                return;
            }

            setImage(file);
            setFileName(file.name);
            setIsUploaded(true);
            setError(''); // Сбрасываем ошибку, если файл корректный
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
            setIsLoading(false);
        }, 300);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            handleCloseModal();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (!isUploaded) {
            setError('Please, upload an image');
            setIsLoading(false);
            return;
        } else if (!message.trim()) {
            setError('Please, enter a comment.');
            setIsLoading(false);
            return;
        } else if (!teamName && boolean) {
            setError('Please select a team.');
            setIsLoading(false);
            return;
        }


        const LocationDate = new Date();
        if (boolean){
            post = {
                "teamName": teamName,
                "likes": 0,
                "date": LocationDate.toISOString().replace('Z', ''),
                "teamNumber": 1,
                "comment": message,
                "curator": login,
            }
        } else {
            post = {
                "idDay": idDay,
                "role": role,
                "login": login,
                "comment": message,
            }

        }

        const postData = new FormData();

        postData.append('photo', image);
        postData.append('post', JSON.stringify(post))
        try {
            if (boolean) {
                await submitPost(postData);
            } else {
                await submitPostDay(postData);
            }
            handleCloseModal();
            handleAddPost();
        } catch (error) {
            setError('There was an error submitting the form. ' + (error.response ? error.response.data.message : ''));
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const loadTeams = async () => {
                try {
                    const teamList = await fetchTeamList(login); // Получаем логин
                    teamList.forEach(team => {
                        console.log('Team:', team, 'Type:', typeof team); // Логируем каждую команду и её тип
                    });
                    setTeams(teamList); // Устанавливаем полученные команды в состояние
                } catch (error) {
                    console.error('Ошибка при загрузке команд:', error);
                }
            }; // Загружаем команды при открытии модального окна
            loadTeams();
        }
    }, [isModalOpen, login]);

    return (
        <div className={`addPost${!boolean ? ' active-button' : ''}`}>
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
                        <form className="container-form" onSubmit={(event) => handleSubmit(event, { message, teamName, image }, setIsLoading, setError, handleCloseModal)}>
                            <div className={`border-gradient ${isUploaded ? 'uploaded' : ''}`}>
                                <div className="upload-an-image">
                                    {!isUploaded && (
                                        <>
                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <line x1="16.5" y1="0.5" x2="16.5" y2="31.5"
                                                      stroke="url(#paint0_linear_0_1)" strokeLinecap="round"/>
                                                <line x1="31.5" y1="16.5" x2="0.5" y2="16.5"
                                                      stroke="url(#paint1_linear_0_1)" strokeLinecap="round"/>
                                                <defs>
                                                    <linearGradient id="paint0_linear_0_1" x1="16" y1="16" x2="15"
                                                                    y2="16" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#76D7C9"/>
                                                        <stop offset="1" stopColor="#75F5C5"/>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_0_1" x1="16" y1="16" x2="16"
                                                                    y2="15" gradientUnits="userSpaceOnUse">
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
                                            <img src={URL.createObjectURL(image)} alt="Uploaded"
                                                 style={{borderRadius: '10px', height: 'auto', maxWidth: '100%'}}/>
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
                            {boolean && (
                                <select id="teamSelect" value={teamName} onChange={handleTeamChange}
                                        className="custom-select">
                                    <option value="" disabled>Select a team</option>
                                    {teams.map((team, index) => (
                                        <option key={index} value={team}>{team}</option>
                                    ))}
                                </select>
                            )}
                            <div className="border-gradient">
                                <div className="commentContainer">
                                    <textarea
                                        id='fromComment'
                                        className="form_input-comm"
                                        placeholder="Comment"
                                        ref={textareaRef}
                                        value={message}
                                        onChange={(event) => handleCommentChange(event, setMessage, setError)}
                                        rows="1"
                                        cols ="50"
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
                                    <div className='comment-counter'>
                                        {getCommentCounter(message, maxLength)}
                                    </div>
                                </div>
                            </div>
                            {error && (
                                <div className="error">
                                    <p className="error-message">{error}</p>
                                    <div className="error-icon">⚠️</div>
                                </div>
                            )}
                            <button
                                className="button-from"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="loading-spinner"></div>
                                ) : (
                                    <p>SUBMIT</p>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddPost;
