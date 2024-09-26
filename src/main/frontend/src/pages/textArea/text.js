
export const maxLength = 512;
export const adjustTextareaHeight = (textareaRef) => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
};

export const handleCommentChange = (event, setMessage, setError) => {
    setMessage(event.target.value);
    setError('');
};

export const getCommentCounter = (message, maxLength) => {
    return `${message.length} / ${maxLength}`;
};