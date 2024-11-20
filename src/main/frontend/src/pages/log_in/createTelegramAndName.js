import React, {useState} from "react";
import {createTelegram} from "../../store/slice/telegramSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function CreateTelegramAndName() {
    const {result} = useSelector((state) => state.telegram);
    const {login} = useSelector((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);
    const [telegram, setTelegram] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validateName = (name) => {
        if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(name) || name.length < 2) {
            return "Имя должно содержать только буквы и быть не короче 2 символов.";
        }
        return "";
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        setError(validateName(newName));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const validationError = validateName(name);
        if (validationError) {
            setError(validationError);
            setIsLoading(false);
            return;
        } else {
            setError("");
            const formData = {
                "name": name,
                "login": login,
                "telegram": telegram,
            };
            await dispatch(createTelegram(formData));
            if (result === 0) {
                navigate("/post");
            }
        }
        setIsLoading(false);
    };

    return (
        <div className={`mr-142`}>
            <div className={`login mr-141`}>
                <h2 className={`mr-1`}>Добро пожаловать!</h2>

                <form className={`container-form mr-140`} onSubmit={handleSubmit}>
                    <label htmlFor="name">Введите имя</label>
                    <div className="form_item mr-139">
                        <input
                            id="name"
                            placeholder='Name'
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <label htmlFor="telegram">Введите ник Телеграм</label>
                    <div className="form_item mr-139">
                        <input
                            id="telegram"
                            placeholder='@telegram'
                            value={telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="error mr-144">
                            <p className="error-message">{error}</p>
                            <div className="error-icon">⚠️</div>
                        </div>
                    )}
                    <div className='submit mr-143'>
                        <button
                            className='btn create-btn login-submit'
                            id='login-submit'
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="loading-spinner"></div>
                            ) : (
                                <p>Log in</p>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTelegramAndName;
