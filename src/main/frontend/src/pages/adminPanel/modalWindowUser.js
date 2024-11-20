import React from "react";
import Button from "../button/button";

function ModalWindowUser({onClickOpenWindow, clickDeleteUser, id}) {
    return (
        <div className="modal-overlay modal-index">
            <div className="modal-content">
                <h2>Вы действительно хотите удалить участника из команды?</h2>
                <Button
                    handleCloseModal={onClickOpenWindow}
                    submitYes={'Yes'}
                    submiteNo={'No'}
                    handleFunction={clickDeleteUser}
                    item={id}
                />
            </div>
        </div>
    );
}

export default ModalWindowUser;