import React from 'react';
import '../../css/profile.scss';
import Burger from '../header_burger';

function Profile() {
    return (
        <div>
            <Burger />
            <div className="profile">
                 <div className="profile-cont">
                     <div className="profile-img">
                        <img src='' alt='avatar-profile'></img>
                     </div>
                     <div className="profile-info">
                        <div className="profile-name">
                            <h2>ellieene@student.21-school.ru</h2>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
    );
}

export default Profile;
