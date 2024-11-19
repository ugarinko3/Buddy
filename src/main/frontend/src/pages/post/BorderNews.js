import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, likePost, unlikePost, updatePostState, toggleMyPosts } from '../../store/slice/postSlice';
import { RegistrationSeason, Season, getSeason } from "../../store/slice/seasonSlice";
import '../../css/post.scss';
import '../../css/season.scss';
import Burger from '../header/header_burger';
import Loading from '../loading/loading';
import AddPost from './addPost';
import ConfirmModal from './configModal';
import Post from './post';
import RegistrationSeasonNews from "./registrationSeason";

function BorderNews() {
    const {season, registration, buttonStatus, dateSeason} = useSelector((state) => state.season);
    // const [dateSeason, setDateSeason] =useState("will be known soon");
    const dispatch = useDispatch();
    const {login, role, idUser}  = useSelector((state) => state.token);
    const { posts, error: postError, loading, showMyPosts } = useSelector((state) => state.post);
    const [expandedPostIndex, setExpandedPostIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [loadingSeason, setLoadingSeason] = useState(false)


    useEffect(() => {
        dispatch(getSeason());
        dispatch(Season(login));
    }, [dispatch]);


    const getStatus = () => {
        setLoadingSeason(true);
        setTimeout(() => {
            setLoadingSeason(false);
            dispatch(Season(login));
        }, 3000);
    }


    const registrationSeason = (login) => {
        dispatch(RegistrationSeason(login));
        getStatus();
    }

    useEffect(() => {
        const loadPosts = async () => {
            try {
                await dispatch(fetchPosts(login));
            } catch (error) {
                console.error('Failed to fetch posts:', error.message);
            }
        };

        loadPosts();
    }, [dispatch, login]);

    const handleLikePost = async (item) => {
        try {
            let updatedPost;

            // Лайк или дизлайк
            if (item.liked) {
                await dispatch(unlikePost(item.id, login));
                updatedPost = {
                    ...item,
                    liked: false,
                    likes: item.likes - 1 , // Уменьшаем количество лайков
                    likedByUsers: item.likedByUsers.filter(user => user !== login) // Удаляем пользователя из списка

                };
            } else {
                await dispatch(likePost(item.id, login));
                updatedPost = {
                    ...item,
                    liked: true,
                    likes: item.likes + 1 , // Увеличиваем количество лайков
                    likedByUsers: [...item.likedByUsers, login] // Добавляем текущего пользователя в список
                };
            }

            // Обновляем конкретный пост в состоянии Redux или локальном состоянии
            dispatch(updatePostState(updatedPost)); // Этот action нужно создать

        } catch (error) {
            console.error('Failed to like/unlike post:', error);
        }
    };


    const handleDeletePost = (postId) => {
        setPostToDelete(postId);
        setIsModalOpen(true);
    };

    const confirmDeletePost = () => {
        if (postToDelete) {
            dispatch(deletePost(postToDelete));
            setPostToDelete(null);
        }
        setIsModalOpen(false);
    };

    const cancelDeletePost = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    const handleAddPost = () => {
        dispatch(fetchPosts(login));
    };

    const showFullText = (index) => {
        setExpandedPostIndex(expandedPostIndex === index ? null : index);
    };

    const handleToggleMyPosts = () => {
        dispatch(toggleMyPosts());
    };


    if (loading && posts.length === 0) return <Loading />;
    if (postError) return <p>Error: {postError}</p>;

    const postsToDisplay = showMyPosts
        ? posts.filter(posts => posts.curator === login)
        : posts;

    return (
        <div className='main'>
            <Burger/>
            {role === "admin" || season.status === "Action" ? (
                <div className='conteiner-main-news'>
                    <div className='curator-news'>
                        {(role === 'admin' || role === 'curator') && (
                            <div className='button-curator'>
                                <button className={`my-post ${showMyPosts ? 'active' : ''}`}
                                        onClick={handleToggleMyPosts}>
                                    {showMyPosts ? 'Все посты' : 'Мои посты'}
                                </button>
                                <AddPost onAddPost={handleAddPost} boolean={true} login={login} role={role}/>
                            </div>
                        )}
                        {showMyPosts && postsToDisplay.length === 0 && (
                            <div className='no-active-post'>
                                У вас нет постов
                            </div>
                        )}
                        {postsToDisplay.map((item, index) => (
                            <Post
                                item={item}
                                key={item.id}
                                nickName={item.login}
                                login={login}
                                handleLikePost={handleLikePost}
                                handleDeletePost={handleDeletePost}
                                showFullText={showFullText}
                                index={index}
                                usePostDayUser={false}
                            />
                        ))}
                    </div>
                </div>
            ):(
                <RegistrationSeasonNews
                    loadingSeason={loadingSeason}
                    registration={registration}
                    buttonStatus={buttonStatus}
                    dateSeason={dateSeason}
                    login={login}
                    registrationSeason={registrationSeason}
                />
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={cancelDeletePost}
                onConfirm={confirmDeletePost}
            />
        </div>
    );
}

export default BorderNews;
