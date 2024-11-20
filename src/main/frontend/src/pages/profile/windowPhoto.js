import React, {useState} from 'react';
import Button from "../button/button";
import {useDispatch} from "react-redux";
import {fetchCreateAvatar} from "../../store/slice/profileSlice";

function WindowPhoto({handeCloseModal, login, reloadProfile}) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setError("");
        }
    };

    const createPhoto = () => {
        if (!image) {
            setError("Пожалуйста, загрузите фотографию.");
            return;
        }
        setLoading(true);
        setImage(null);
        dispatch(fetchCreateAvatar(image, login));
        setTimeout(() => {
            reloadProfile();
            setLoading(false);
        }, 12000);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Изменить фото профиля.</h2>
                <div className={`line wh-12`}></div>
                <div className={`createImage`}>
                    <div className="container">
                        {!loading ? (
                            <>
                                <input type="file" accept="image/*" onChange={handleImageChange}/>
                                <div className="image-preview">
                                    {image && <img src={URL.createObjectURL(image)} alt="Image Preview"/>}
                                </div>
                                {error && <div className="error-message">{error}</div>}
                            </>
                        ) : (
                            <div className="loading-container">
                                <div className="loading-bar"></div>
                            </div>
                        )}
                        {!loading && (<Button
                            submiteNo={"Отмена"}
                            submitYes={"Изменить"}
                            handleCloseModal={handeCloseModal}
                            handleFunction={createPhoto}
                        />)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WindowPhoto;
