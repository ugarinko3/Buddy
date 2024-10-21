import React from "react";


function Button({handleCloseModal, isLoading, submit, handleFunction}) {
    return (
        <div className={`modal-buttons `}>
            <button
                className="btn cancel-btn"
                type="submit"
                disabled={isLoading}
                onClick={handleCloseModal}
            >
                <p>exit</p>
            </button>
            <button
                className="btn create-btn"
                type="submit"
                disabled={isLoading}
                onClick={handleFunction}
            >
                {isLoading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <p>{submit}</p>
                )}
            </button>
        </div>
    );
}

export default Button;