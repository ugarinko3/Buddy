import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import '../../css/calendar.scss';
import {fetchCreateSeason} from "../../store/slice/seasonSlice";

const Modal = ({isOpen, onClose}) => {
    const {error} = useSelector((state) => state.season);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [seasonName, setSeasonName] = useState('');
    const [showError, setShowError] = useState('');
    const dispatch = useDispatch();
    const maxDate = '2030-12-31';

    if (!isOpen) return null;

    const formatDateToDDMMYYYY = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handleDateChange = (e, setDate) => {
        const selectedDate = e.target.value;

        if (selectedDate > maxDate) {
            setDate(maxDate);
        } else {
            setDate(selectedDate);
        }

        setShowError('');
    };

    const handleBlur = (e, setDate) => {
        const selectedDate = e.target.value;

        if (selectedDate > maxDate) {
            setDate(maxDate);
            e.target.value = maxDate;
        }
    };

    const isFormValid = startDate !== '' && endDate !== '' && seasonName !== '';

    const handleCreateClick = () => {
        if (!isFormValid) {
            setShowError('Проверьте правильно введена дата или номер сезона');
        } else {
            dispatch(fetchCreateSeason(seasonName, formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate)));
            if (error) {
                setShowError(error);
            } else {
                onClose();
            }
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className={`mr-1`}>New season</h2>

                <div className={`name-season`}>
                    <label htmlFor={`numberSeason`}>Номер сезона:</label>
                    <div className={`season`}>
                        <input
                            id={`numberSeason`}
                            className={`season`}
                            value={seasonName}
                            onChange={(e) => setSeasonName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="date-inputs">
                    <div className="date-picker">
                        <label htmlFor="start-date">С какого:</label>
                        <input
                            id="start-date"
                            type="date"
                            className="date-field"
                            max={maxDate}
                            value={startDate}
                            onChange={(e) => handleDateChange(e, setStartDate)}
                            onBlur={(e) => handleBlur(e, setStartDate)}
                        />
                    </div>
                    <div className="date-picker">
                        <label htmlFor="end-date">По какое:</label>
                        <input
                            id="end-date"
                            type="date"
                            className="date-field"
                            max={maxDate}
                            value={endDate}
                            onChange={(e) => handleDateChange(e, setEndDate)}
                            onBlur={(e) => handleBlur(e, setEndDate)}
                        />
                    </div>
                </div>
                {showError && (
                    <div className="error-message" style={{color: '#c01e1e'}}>
                        {showError}
                    </div>
                )}

                <div className="modal-buttons">
                    <button className="btn cancel-btn" onClick={onClose}>Отмена</button>
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
};

export default Modal;
