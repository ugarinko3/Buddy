import Burger from "../header/header_burger";
import '../../css/tournament.scss';
import UserTour from "./userTour";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from "react";
import {fetchUserTournament} from "../../store/slice/tournamentSlice";
import Loading from "../loading/loading";
import Error from "../error/error";


function Tournament(){
    const dispatch = useDispatch();
    const {users, loading, error} = useSelector((state) => state.tournament);

    useEffect(() => {
        dispatch(fetchUserTournament());
    }, [dispatch]);

    if (loading) return <Loading />;
    if (error) return <Error code={error}/>;
    return(
        <div className={`main`}>
            <Burger />
            <div className={`conteiner-main-news tournament-container`}>
                <div className={`link-name`}>
                    <h2>Tournament in Peer</h2>
                </div>
                <div className={`user-flex`}>
                    {users && users.map((item, index) => {
                        return (
                            <UserTour
                                item={item}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Tournament;