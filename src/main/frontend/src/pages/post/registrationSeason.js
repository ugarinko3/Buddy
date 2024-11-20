import React from "react";


function RegistrationSeasonNews({loadingSeason, registration, buttonStatus, dateSeason, login, registrationSeason}) {
    return (
        <div className={`no-season-container`}>
            <div className={`registration`}>
                <div className={`container-registration`}>
                    <h2 className={`name`}>Registration for the season</h2>
                    <p>Hello! We are happy to welcome you to Buddy Team! This is a unique opportunity to become part
                        of a friendly team where you can develop your skills, find like-minded individuals, and
                        participate in interesting projects.</p><br/>
                    <p>Buddy Team is a community that brings together people with different interests and
                        experiences. We support each other, share knowledge, and help achieve common goals. If you
                        want to learn more about Buddy Team and how you can join us, please sign up for our</p><br/>
                    <p className={`margin-right`}>The new season starts on: <strong>{dateSeason}</strong></p>
                    <div className={`container-status-season`}>
                        {loadingSeason ? (
                            <div className="loading-container news">
                                <div className="loading-bar an-120"></div>
                            </div>
                        ) : registration ? (
                            buttonStatus ? (
                                <div className={`season-success`}>
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M16.3487 0.503235L6.66325 10.1887L1.65005 5.17545L0 6.8255L6.66325 13.4899L17.9999 2.15445L16.3487 0.503235Z"
                                              fill="white"/>
                                    </svg>
                                    <h3>Registered</h3>
                                </div>
                            ) : (
                                <button className={`btn create-btn`}
                                        onClick={() => registrationSeason(login)}>Registration</button>
                            )
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationSeasonNews;