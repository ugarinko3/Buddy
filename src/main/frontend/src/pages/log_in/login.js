import React, {useState, useEffect} from 'react';
import '../../css/login.scss';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, clearError} from '../../store/slice/logSlice';
import {ClearCookies} from '../../helpFunction/clearCookies';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const errorMessage = useSelector((state) => state.log.errorMessage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ClearCookies();
        const hasReloaded = sessionStorage.getItem('hasReloaded');

        if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true');
            window.location.reload();
        }
    }, []);

    const click_login = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        dispatch(clearError());

        try {
            const fullLogin = `${login}@student.21-school.ru`;
            const action = await dispatch(loginUser({login: fullLogin, password}));
            if (loginUser.fulfilled.match(action)) {
                document.cookie = `access_token=${action.payload.accessToken}; path=/;`;
                document.cookie = `login=${fullLogin}; path=/;`;
                if (action.payload.result === 0) {
                    navigate('/create-account')
                } else {
                    navigate('/post');
                }
            }
        } catch (error) {
            setLogin('');
            setPassword('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
        if (errorMessage) {
            dispatch(clearError());
        }
    };

    return (
        <div className="entrance">
            <div className="entrance-header">
                <div className='text-login'>
                    <div className='text'>
                        <h1>Team Buddy</h1>
                        <p>A buddy team is a group of people who work together on a specific task or project...</p>
                    </div>
                </div>
                <div className='login-container'>
                    <div className='login'>
                        <h2>Welcome to the team buddy</h2>
                        <p>Please enter the login and password for</p>
                        <a href="https://edu.21-school.ru">https://edu.21-school.ru</a>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className="form_item">
                                <input
                                    id="formLogin"
                                    type="text"
                                    name="login"
                                    className="f"
                                    placeholder='Login'
                                    value={login}
                                    onChange={handleInputChange(setLogin)}
                                />
                            </div>
                            <div className="form_item">
                                <input
                                    id="formPassword"
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    className="f"
                                    placeholder='Password'
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                />
                                {
                                    passwordVisible ?
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="jss75"
                                             width="24" height="24" onClick={click_login}>
                                            <path
                                                d="M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z"></path>
                                        </svg> :
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="jss75"
                                             width="24" height="24" onClick={click_login}>
                                            <path
                                                d="M12 6.49999C14.76 6.49999 17 8.73999 17 11.5C17 12.01 16.9 12.5 16.76 12.96L19.82 16.02C21.21 14.79 22.31 13.25 23 11.49C21.27 7.10999 17 3.99999 12 3.99999C10.73 3.99999 9.51 4.19999 8.36 4.56999L10.53 6.73999C11 6.59999 11.49 6.49999 12 6.49999ZM2.71 3.15999C2.32 3.54999 2.32 4.17999 2.71 4.56999L4.68 6.53999C3.06 7.82999 1.77 9.52999 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.97 18.7 16.31 18.18L19.03 20.9C19.42 21.29 20.05 21.29 20.44 20.9C20.83 20.51 20.83 19.88 20.44 19.49L4.13 3.15999C3.74 2.76999 3.1 2.76999 2.71 3.15999ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 10.73 7.18 9.99999 7.49 9.35999L9.06 10.93C9.03 11.11 9 11.3 9 11.5C9 13.16 10.34 14.5 12 14.5C12.2 14.5 12.38 14.47 12.57 14.43L14.14 16C13.49 16.32 12.77 16.5 12 16.5ZM14.97 11.17C14.82 9.76999 13.72 8.67999 12.33 8.52999L14.97 11.17Z"></path>
                                        </svg>
                                }
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <div className='submit'>
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
            </div>
        </div>
    );
}

export default Login;
