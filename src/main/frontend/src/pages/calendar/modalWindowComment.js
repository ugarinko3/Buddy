import React, { useRef, useState } from "react";
import {getCommentCounter, handleCommentChange, maxLength } from "../textArea/text";
import '../../css/calendar.scss';
import {fetchCreateComment} from "../../store/slice/calendarSlice";
import {useDispatch} from "react-redux";

function ModalWindowComment({ isOpen, onClose, item, day, suffix, dayNumber, role }) {
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    if (!isOpen) return null;

    const handleCreateClick = async () => {
        const data = {
            comment: message,
            id: item
        }
        try {
            await dispatch(fetchCreateComment(data));
        } catch (error) {
            console.error('Failed to fetch comment:', error.message);
        }
        onClose();
    }
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className={`mr-1`}>{day} Day</h2>
                <p className="edit-comment"> Изменение комментария:</p>
                <div className="commentContainer">
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
                <div className="modal-buttons">
                    <button className="btn cancel-btn" onClick={onClose}>Отмена</button>
                    {/* Закрываем окно при клике */}
                    <button
                        className="btn create-btn"
                        onClick={handleCreateClick}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindowComment;