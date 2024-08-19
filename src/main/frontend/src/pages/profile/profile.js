import React from 'react';
import '../../css/profile.scss';
import Burger from '../header/header_burger';

function Profile() {
    return (
        <div>
            <Burger />
            <div className="profile">
                 <div className="profile-cont">
                     <div className="profile-img">
                        <img src='https://firebasestorage.googleapis.com/v0/b/buddy-ea86a.appspot.com/o/avatars%2Favatar_1.png?alt=media&token=d668660e-6835-4c0c-8fff-8bb6c8f093f9' alt='avatar-profile'></img>
                     </div>
                     <div className="profile-info">
                        <div className="profile-name">
                            <p>ellieene@student.21-school.ru</p>
                        </div>
                        <div className="profile-team-name">
                            <p>Team Name</p>
                        </div>
                        <div className="profile-progress">
                            <div className="profile-progress-day">
                                <div className="completed-days">
                                    <p>7/30</p>
                                </div>
                                <div className="percentage-of-days">
                                    <p>25%</p>
                                </div>
                            </div>
                            <div className="progress-bar">
                                <div className="progress">
                                    <div className="progress-bar-inner"></div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-active">
                            <div className="token">564 token</div>
                            <div className="xp">4815 XP</div>
                        </div>
                        <div className="profile-goals">
                            <div className="goal">
                                <p>Goal</p>
                            </div>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
    );
}

export default Profile;
