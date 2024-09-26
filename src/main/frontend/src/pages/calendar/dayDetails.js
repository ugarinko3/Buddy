import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Burger from "../header/header_burger";
import {useCheckToken} from "../token/token";
import AddPost from "../post/addPost";
import Post from "../post/post";
import '../../css/post.scss'
import {fetchCalendarDay} from "../../store/slice/calendarSlice";
import {useDispatch, useSelector} from "react-redux";



function DayDetails (){
    const dispatch = useDispatch();
    const { day, dayPost, error, loading, availability} = useSelector((state) => state.calendar);
    const { id} = useParams();
    const { login, role } = useCheckToken();
    const [imageLoading, setImageLoading] = useState({ image: true, avatar: true });

    const handleAddPost = () => {
        // dispatch(fetchPosts(login));
    };
    useEffect( () => {
        const loadPosts = async () => {
            try{
                await dispatch(fetchCalendarDay(login, id));
            } catch(error){
            console.error('Failed to fetch calendars:', error.message);
            }
        };
        loadPosts();
    },[dispatch, login, id]);

    return (
        <div>
            <div className='main'>
                <div className='conteiner-main-news'>
                    <Burger/>
                    <div className="curator-news">
                        {availability && (<AddPost onAddPost={handleAddPost} boolean={false} idDay={id} />)}
                        {dayPost.map((item, index) => (
                            <Post
                                item={item}
                                usePostDayUser={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayDetails;