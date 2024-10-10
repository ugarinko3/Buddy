// ConfirmModal.js
import React, { useEffect, useState } from 'react';
import '../../css/ConfirmModal.scss';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            setIsAnimating(false);
            setTimeout(() => {
                setIsAnimating(true);
            }, 50); // Небольшая задержка перед началом анимации
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShow(false), 300); // Время должно совпадать с продолжительностью анимации
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!show) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`}>
            <div className={`modal-content ${isAnimating ? 'show' : ''}`}>
                <h2 className={`mr-1`}>Подтверждение удаления</h2>
                <p className='text'>Вы уверены, что хотите удалить этот пост?</p>
                <div className="modal-actions">
                    <button className='da' onClick={onConfirm}><p>Да</p></button>
                    <button className='net' onClick={onClose}><p>Нет</p></button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
