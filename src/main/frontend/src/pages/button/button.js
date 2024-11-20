import React from "react";


function Button({handleCloseModal, isLoading, submiteNo, submitYes, handleFunction, item, login}) {
    return (
        <div className={`modal-buttons `}>
            <button
                className="btn cancel-btn"
                type="submit"
                disabled={isLoading}
                onClick={handleCloseModal}
            >
                <p>{submiteNo}</p>
            </button>
            <button
                className="btn create-btn"
                type="submit"
                disabled={isLoading}
                onClick={() => handleFunction(item, login)}
            >
                {isLoading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <p>{submitYes}</p>
                )}
            </button>
        </div>
    );
}

export default Button;