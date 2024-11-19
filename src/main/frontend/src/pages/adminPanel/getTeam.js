import React, {useState} from "react";
import {useSelector} from "react-redux";
import Loading from "../loading/loading";
// import Curator from "./curator";
// import User from "./user";
import ListTeam from "./listTeam";


function GetTeam ({handleModalClick, isAnimating, bool, onClickOpenWindow, onClickOpenWindowUser}) {
    // const dispatch = useDispatch();
    // const panel = true;
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
            <div className={`modalContent modalWidth ${isAnimating ? 'show' : ''}`}>
                <div className="conteiner-team">
                    {listTeam.map((item, index) => (
                        <div key={item.id} className="container-function">
                            <div className="nameTeam">
                                <p>{item.name}</p>
                                <button className={`btn create-btn create-btn-margin`}  onClick={() => onClickOpenWindowUser(item)}>добавить</button>
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
                            <ListTeam
                                activeIndex={activeIndex}
                                toggleAnswer={toggleAnswer}
                                index={index}
                                item={item}
                                imageLoading={imageLoading}
                                setImageLoading={setImageLoading}
                                bool={bool}
                                onClickOpenWindow={onClickOpenWindow}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetTeam;