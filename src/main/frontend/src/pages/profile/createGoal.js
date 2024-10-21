import React, { useRef, useState } from "react";
import { getCommentCounter, handleCommentChange, maxLength } from "../textArea/text";

function CreateGoal({ goals, changeStatus, handleCreateClick, message, setMessage, createGoal, onClose, deleteGoal, modalWindow }) {
    const [error, setError] = useState('');
    const textareaRef = useRef(null);

    const handleCreateClickWithValidation = async () => {
        if (!message.trim()) { // Проверка на пустое сообщение
            setError('Comment cannot be empty'); // Установка сообщения об ошибке
            return; // Прекращаем выполнение функции
        }

        setError(''); // Сбрасываем ошибку, если текст не пустой
        await handleCreateClick(); // Вызываем оригинальную функцию
    };

    return (
        <div>
            <button className={`btn create-btn create-goal`} onClick={createGoal}>change</button>
            {modalWindow && (
                <div className={`modal-overlay`}>
                    <div className={`modal-content flex-center`}>
                        <h2 className={`mr-2`}>Describe your goal</h2>
                        <div className={`line`}></div>
                        <div className={`list-goal`}>
                            <div className={`list`}>
                                {goals && goals.length > 0 ? (
                                    goals.map((item, index) => (
                                        <div className={`goal-user ${item.status}`} key={index}>
                                            <div className={`title-goal no-filter-goal`}>{item.title}</div>
                                            <div className={`change-goal`}>
                                                {item.status !== true && (
                                                    <button className={`button-goal create-btn`}
                                                            onClick={() => changeStatus(item)}>success</button>
                                                )}
                                                <button className={`button-goal cancel-btn`}
                                                        onClick={() => deleteGoal(item)}>delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No goals available</div>
                                )}
                            </div>
                        </div>
                        {goals.length < 5 ? (
                            <div className="commentContainer mr-3">
                                <textarea
                                    id='fromComment'
                                    className="form_input-comm"
                                    placeholder="Comment"
                                    ref={textareaRef}
                                    value={message}
                                    onChange={(event) => handleCommentChange(event, setMessage, setError)}
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
                                <div className='comment-counter'>
                                    {getCommentCounter(message, maxLength)}
                                </div>
                            </div>
                        ):(
                            <div className={`max-goal`}>
                                <h3 className={`text-h3`}>Added maximum number of targets</h3>
                            </div>
                        )}
                        {error && <div className="message container-width error">{error}</div>} {/* Отображение сообщения об ошибке */}
                        <div className="modal-buttons container-width">
                            <button className="btn cancel-btn" onClick={onClose}>Exit</button>
                            <button
                                className="btn create-btn"
                                onClick={handleCreateClickWithValidation} // Используем новую функцию
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateGoal;
