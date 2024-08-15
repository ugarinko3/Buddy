import React from 'react';
import '../css/main.scss';
import Burger from './header_burger';
import BorderNews from '../pages/news';

function Main() {

    return (

        <div>
            <Burger />
            <div className="main">
                <div className='conteiner-main-news'>
                    <BorderNews />
                </div>
            </div>
        </div>
    );
};

export default Main;