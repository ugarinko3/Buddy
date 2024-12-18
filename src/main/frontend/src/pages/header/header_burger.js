import '../../css/burger.scss';
import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

function Burger() {
    const [activeMenu, setActiveMenu] = useState('');
    const {role, login} = useSelector((state) => state.token);

    function clickBurger() {
        activeMenu === '' ? setActiveMenu('active') : setActiveMenu('');
    }

    const handleLogout = (event) => {
        event.preventDefault();
        document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        window.location.href = '/';
    };
    return (
        <header className='BurgerContainer'>
            <div className='NameApp'>
                <a href='/post' className='svgLogo'>
                    <svg width="83" height="26" viewBox="0 0 83 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.0546875 25V0.390625H4.97656V25H0.0546875ZM6.91016 25V20.6758H7.08594C8.49219 20.6758 9.42969 20.0898 9.89844 18.918C10.0625 18.543 10.1445 18.1562 10.1445 17.7578C10.1445 16.5859 9.67578 15.7422 8.73828 15.2266C8.26953 14.9688 7.75391 14.8398 7.19141 14.8398H6.91016V10.5508H7.19141C8.50391 10.5508 9.40625 9.98828 9.89844 8.86328C10.0625 8.46484 10.1445 8.05469 10.1445 7.63281C10.1445 6.48438 9.66406 5.64062 8.70312 5.10156C8.21094 4.84375 7.67188 4.71484 7.08594 4.71484H6.91016V0.390625H7.75391C10.8008 0.390625 12.9453 1.50391 14.1875 3.73047C14.7734 4.80859 15.0664 5.99219 15.0664 7.28125C15.0664 9.32031 14.4453 10.9727 13.2031 12.2383C13.0156 12.4023 12.8398 12.5547 12.6758 12.6953C14.0352 13.7031 14.8203 15.2383 15.0312 17.3008C15.0547 17.582 15.0664 17.8516 15.0664 18.1094C15.0664 20.3828 14.2695 22.1641 12.6758 23.4531C11.3633 24.4844 9.72266 25 7.75391 25H6.91016ZM17.2812 18.2148V0.390625H22.2383V18.2148C22.2617 19.1758 22.8008 19.8086 23.8555 20.1133C24.0195 20.1602 24.1367 20.1836 24.207 20.1836V25.1758C22.8477 25.1758 21.4883 24.6953 20.1289 23.7344C18.2539 22.3516 17.3047 20.5117 17.2812 18.2148ZM26.1055 25.1758V20.1836C26.5273 20.1836 26.9727 19.9844 27.4414 19.5859C27.8398 19.2109 28.0508 18.7539 28.0742 18.2148V0.390625H32.9961V18.2148C32.9961 20.8633 31.8242 22.8438 29.4805 24.1562C28.3086 24.8359 27.1836 25.1758 26.1055 25.1758ZM35.6328 25V0.390625H40.5898V25H35.6328ZM42.4883 25V20.043C43.0039 20.043 43.4844 19.832 43.9297 19.4102C44.2578 19.0352 44.4336 18.5898 44.457 18.0742V7.31641C44.457 6.84766 44.2578 6.39062 43.8594 5.94531C43.4844 5.57031 43.0273 5.37109 42.4883 5.34766V0.390625C45.0898 0.390625 47.0586 1.55078 48.3945 3.87109C49.0742 5.06641 49.4141 6.21484 49.4141 7.31641V18.0742C49.4141 20.7461 48.2305 22.7383 45.8633 24.0508C44.6914 24.6836 43.5664 25 42.4883 25ZM52.2266 25V0.390625H57.1836V25H52.2266ZM59.082 25V20.043C59.5977 20.043 60.0781 19.832 60.5234 19.4102C60.8516 19.0352 61.0273 18.5898 61.0508 18.0742V7.31641C61.0508 6.84766 60.8516 6.39062 60.4531 5.94531C60.0781 5.57031 59.6211 5.37109 59.082 5.34766V0.390625C61.6836 0.390625 63.6523 1.55078 64.9883 3.87109C65.668 5.06641 66.0078 6.21484 66.0078 7.31641V18.0742C66.0078 20.7461 64.8242 22.7383 62.457 24.0508C61.2852 24.6836 60.1602 25 59.082 25ZM67.7656 0.390625H72.9336L77.5039 16.1055V25H72.3711V16.1406L67.7656 0.390625ZM76.3086 5.13672L77.6797 0.390625H82.7773L78.9453 13.3633H78.6289L76.3086 5.13672Z"
                            fill="url(#paint0_linear_4_1334)"/>
                        <defs>
                            <linearGradient id="paint0_linear_4_1334" x1="10.125" y1="3.72529e-07" x2="39.561"
                                            y2="9.30327" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#78B2CD"/>
                                <stop offset="1" stopColor="#75F5C5"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </a>
                <div className="search">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.51831 2.00431C4.92058 2.00431 2.00431 4.92058 2.00431 8.51831C2.00431 12.116 4.92058 15.0323 8.51831 15.0323C10.3172 15.0323 11.9447 14.3048 13.1242 13.1242C14.3048 11.9447 15.0323 10.3172 15.0323 8.51831C15.0323 4.92058 12.116 2.00431 8.51831 2.00431ZM0 8.51831C0 3.8142 3.8142 0 8.51831 0C13.2224 0 17.0366 3.8142 17.0366 8.51831C17.0366 10.5086 16.3532 12.3415 15.2087 13.7917L20 18.583L18.583 20L13.7917 15.2087C12.3415 16.3532 10.5086 17.0366 8.51831 17.0366C3.8142 17.0366 0 13.2224 0 8.51831Z"
                            fill="url(#paint0_linear_85_1513)"/>
                        <defs>
                            <linearGradient id="paint0_linear_85_1513" x1="10" y1="0" x2="10" y2="20"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#76D7C9"/>
                                <stop offset="1" stopColor="#75F5C5"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <button onClick={clickBurger} className="button-header-burger">
                    <div className={'header-burger ' + activeMenu} id='button-header'>
                        <span></span>
                    </div>
                </button>
                <nav className={'header-menu ' + activeMenu} id="menu">
                    <div className={"header-menu-container " + activeMenu} id='header-menu-function'>
                        <ul className="header-list">
                            {role === "admin" && (
                                <li>
                                    <Link to="/admin-panel" className="header-link">Panel</Link>
                                </li>
                            )}
                            <li>
                                <Link to="/post" className="header-link _active-link">News</Link>
                            </li>
                            <li>
                                <Link to="/calendar" className="header-link">Calendar</Link>
                            </li>
                            <li>
                                <a href={`/profile/${login}`} className="header-link">Profile</a>
                            </li>
                            <li>
                                <a href="/tournament" className="header-link">Tournament</a>
                            </li>
                            <button onClick={handleLogout} className="log-out btn cancel-btn">Log out <svg
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="jss141 jss1370"
                                width="24" height="24">
                                <path
                                    d="M10.79 16.29C11.18 16.68 11.81 16.68 12.2 16.29L15.79 12.7C16.18 12.31 16.18 11.68 15.79 11.29L12.2 7.7C11.81 7.31 11.18 7.31 10.79 7.7C10.4 8.09 10.4 8.72 10.79 9.11L12.67 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13H12.67L10.79 14.88C10.4 15.27 10.41 15.91 10.79 16.29ZM19 3H5C3.89 3 3 3.9 3 5V8C3 8.55 3.45 9 4 9C4.55 9 5 8.55 5 8V6C5 5.45 5.45 5 6 5H18C18.55 5 19 5.45 19 6V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V16C5 15.45 4.55 15 4 15C3.45 15 3 15.45 3 16V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"></path>
                            </svg></button>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Burger;