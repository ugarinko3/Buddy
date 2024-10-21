import Curator from "./curator";
import User from "./user";
import React from "react";

function ListTeam({activeIndex, toggleAnswer, index, item, imageLoading, setImageLoading}) {
    return (
        <div key={index}>
            <div className="faq__col">
                <div className={`faq__item ${activeIndex === index ? 'active' : ''}`}>
                    {/* Заголовок, по которому происходит клик */}
                    <div className={`list-team`} onClick={() => {
                            toggleAnswer(index)
                    }}>
                        <div className={`mini-name-team ${activeIndex === index ? 'open' : ''}`}
                             style={{maxHeight: activeIndex === index ? '0px' : ''}}>
                            <h2>{item.name}</h2>
                        </div>
                        <div className={`click-me`}>click me</div>
                        <div
                            className={`faq-flex faq-answer ${activeIndex === index ? 'open' : ''}`}
                            style={{
                                maxHeight: activeIndex === index ? '' : '0px'
                            }}
                        >
                        {item && item.curator && (
                            <Curator
                                toggleAnswer={toggleAnswer}
                                index={index}
                                item={item.curator}
                                imageLoading={imageLoading}
                                setImageLoading={setImageLoading}
                                bool={true}
                            />
                        )}
                        {item && item.participants && item.participants.map((itemParticipants, i) => (
                            <User
                                key={i}
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
    );
}

export default ListTeam;