import React, { useEffect, useRef, useState } from 'react';
import '../../css/createDay.scss';
import { adjustTextareaHeight, getCommentCounter, maxLength } from '../textArea/text';

const CreateDaysForm = () => {
    const [numDays, setNumDays] = useState(1);
    const [comments, setComments] = useState(['']);
    const textareaRefs = useRef([]);

    useEffect(() => {
        // Clear out any old refs to avoid null values
        textareaRefs.current = textareaRefs.current.slice(0, numDays);

        // Adjust the height for each textarea
        textareaRefs.current.forEach(ref => {
            if (ref) {
                adjustTextareaHeight(ref);
            }
        });
    }, [comments, numDays]); // Re-run when comments or numDays change

    const handleNumDaysChange = (e) => {
        const value = e.target.value; // Get the raw input value

        // Check if the input is empty
        if (value === '') {
            setNumDays(1); // Reset to default if empty
            setComments(['']); // Reset comments to one empty string
            return;
        }

        const parsedValue = parseInt(value);

        // Ensure the value is within the range of 1 to 60
        if (parsedValue < 1) {
            setNumDays(1);
            setComments(['']); // Reset comments
        } else if (parsedValue > 31) {
            setNumDays(31);
            setComments(Array(31).fill('')); // Reset comments
        } else {
            setNumDays(parsedValue);
            setComments(Array(parsedValue).fill('')); // Reset comments
        }
    };

    const handleCommentChange = (index, value) => {
        const newComments = [...comments];
        newComments[index] = value;
        setComments(newComments);
    };

    return (
        <div className="container-calendar-day">
            <div className="create-day">
                <div>
                    {Array.from({ length: numDays }, (_, i) => (
                        <div key={i} className='day'>
                            <h3>День {i + 1}</h3>
                            <label htmlFor={`commentDay${i}`}>Комментарий дня:</label>
                            <div className="commentContainer">
                                <textarea
                                    id={`commentDay${i}`}
                                    className="form_input-comm"
                                    placeholder="Comment"
                                    ref={el => textareaRefs.current[i] = el} // Assign ref for each textarea
                                    value={comments[i]}
                                    onChange={(event) => handleCommentChange(i, event.target.value)}
                                    rows="1"
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
                                    {getCommentCounter(comments[i], 256)}
                                </div>
                            </div>
                            <br /><br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateDaysForm;
