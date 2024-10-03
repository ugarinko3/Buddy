import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import Burger from "../header/header_burger";
import AddPost from "../post/addPost";
import Post from "../post/post";
import '../../css/post.scss'
import {fetchCalendarDay} from "../../store/slice/calendarSlice";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../loading/loading";
import {fetchStatus} from "../../store/slice/statusSlice";



function DayDetails (){
    const dispatch = useDispatch();
    const {login, role}  = useSelector((state) => state.token);
    const { dayPost, error, loading, availability} = useSelector((state) => state.calendar);
    const { id} = useParams();
    // const [imageLoading, setImageLoading] = useState({ image: true, avatar: true });

    const handleAddPost = () => {
        dispatch(fetchCalendarDay(login, id));
    };
    useEffect(() => {
        // if (Array.isArray(dayPost) && dayPost.length === 0) {
            dispatch(fetchCalendarDay(login, id));
        // }
    }, [dispatch, id, login]);

    const functionStatus = (post) => {
        // Call the fetchStatus action with the item
        dispatch(fetchStatus(post));
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;
    console.log(dayPost)
    return (
        <div>
            <div className='main'>
                <div className='conteiner-main-news'>
                    <Burger/>
                    <div className="curator-news">
                        {!availability &&(
                            <div className='container-bottom'>
                                <div className={`conteiner-comment-day`}>
                                    <div className={`comment-dayDetails`}>
                                        <h2>INFO</h2>
                                        <p>{dayPost[0].messagePost}</p>
                                        <div className={`button-right`}>
                                            <p>You
                                                have no posts for this day yet. <br></br>Make sure to upload your posts
                                                before the day ends.</p>
                                            <AddPost onAddPost={handleAddPost} boolean={false} idDay={id}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {dayPost && dayPost.length > 0 && (
                            dayPost.map((post) => {
                                // Проверяем, существует ли postDayUser и не является ли он null
                                if (post.postDayUser) {
                                    // console.log(post);
                                    return (
                                        <Post
                                            key={post.postDayUser.id} // Используем ID поста
                                            item={post}
                                            role={role}
                                            nickName={post.postDayUser.nameUser}
                                            commentPost={post.messagePost}
                                            usePostDayUser={true}
                                            functionStatus={functionStatus}
                                        />
                                    );
                                }
                                return null; // Если postDayUser нет, возвращаем null
                            })
                        )}
                        {/*{dayPost.availability && dayPost.length > 0 ? (*/}
                        {/*    dayPost.map((day) => (*/}
                        {/*        day.postDayUser && (*/}
                        {/*            <Post*/}
                        {/*                key={day.id} // Используем id из postDayUser*/}
                        {/*                item={day}*/}
                        {/*                role={role}*/}
                        {/*                usePostDayUser={true}*/}
                        {/*            />*/}
                        {/*        )*/}
                        {/*    ))*/}

                        {/*{dayPost.postDayUser === null ? (*/}
                        {/*    dayPost.postDayUser.map((item) => (*/}
                        {/*        <Post*/}
                        {/*            key={item.id} // Предполагается, что у item есть уникальный id*/}
                        {/*            item={item}*/}
                        {/*            role={role}*/}
                        {/*            usePostDayUser={true}*/}
                        {/*        />*/}
                        {/*    ))*/}
                        {/*) : (*/}
                        {/*    <p>No posts available for this day.</p>*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayDetails;