import React, {useState} from "react";
import {useSelector} from "react-redux";
import Loading from "../loading/loading";
import Curator from "./curator";
import User from "./user";


function GetTeam ({handleModalClick, isAnimating}) {
    // const dispatch = useDispatch();
    // const [isModal, setIsModal] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const {loading, error, listTeam} = useSelector((state) => state.team);
    const [activeIndex, setActiveIndex] = useState(null); // Отслеживание активного индекса
    const [imageLoading, setImageLoading] = useState({ image: true, avatar: true });


    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Переключение активного индекса
    };

    if (loading && listTeam.length === 0) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={`modal ${isAnimating ? 'show' : ''}`} onClick={handleModalClick}>
            <div className={`modalContent ${isAnimating ? 'show' : ''}`}>
                <div className="conteiner-team">
                    {listTeam.map((item, index) => (
                        <div key={item.id} className="container-function">
                            <div className="nameTeam">
                                <p>{item.name}</p>
                            </div>
                            <div className="summ-participants">
                                <div className={`box-number`}>
                                    <p className={`box`}>1</p>
                                    <p>curator</p>
                                </div>
                                <div className={`box-number`}>
                                    <p className={`box`}>{item.participants.length}</p>
                                    <p>user</p>
                                </div>
                            </div>
                            <div className="list-team">
                                <div className="faq__col">
                                    <div className={`faq__item ${activeIndex === index ? 'active' : ''}`}>
                                        {/* Заголовок, по которому происходит клик */}
                                        <div className={`curator`}>
                                            <Curator
                                                toggleAnswer={toggleAnswer}
                                                index = {index}
                                                item={item.curator}
                                                imageLoading={imageLoading}
                                                setImageLoading={setImageLoading}
                                                bool = {true}
                                            />
                                        </div>
                                        <div
                                            className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
                                            style={{
                                                maxHeight: activeIndex === index ? '500px' : '0px'
                                            }}
                                        >
                                            {item.participants.map((itemParticipants, i) => (
                                                <User
                                                    itemParticipants={itemParticipants}
                                                    imageLoading={imageLoading}
                                                    setImageLoading={setImageLoading}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetTeam;