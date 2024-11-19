import React, { useRef, useState } from "react";
import {getCommentCounter, handleCommentChange, maxLength } from "../textArea/text";
import '../../css/calendar.scss';
import {fetchCalendar, fetchCreateComment} from "../../store/slice/calendarSlice";
import {useDispatch, useSelector} from "react-redux";
import Button from "../button/button";

function ModalWindowComment({ isOpen, onClose, item, day}) {
    const [error, setError] = useState('');
    const {login}  = useSelector((state) => state.token);
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
            await dispatch(fetchCalendar(login))
        } catch (error) {
            console.error('Failed to fetch comment:', error.message);
        }
        onClose();
    }
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="modal-overlay" key={day.id}>
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
                <Button
                    handleCloseModal={onClose}
                    submitYes={"create"}
                    submiteNo={"exit"}
                    handleFunction={handleCreateClick}
                />
            </div>
        </div>
    );
}

export default ModalWindowComment;