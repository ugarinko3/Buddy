import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost, likePost, unlikePost, updatePostState, toggleMyPosts } from '../../store/slice/postSlice';
import { RegistrationSeason, Season } from "../../store/slice/seasonSlice";
import '../../css/post.scss';
import '../../css/season.scss';
import Burger from '../header/header_burger';
import Loading from '../loading/loading';
import AddPost from './addPost';
import ConfirmModal from './configModal';
import Post from './post';

function BorderNews() {
    const seasson = false;
    const [dateSeason, setDateSeason] =useState("will be known soon");
    const [buttonStatus, setButtonStatus] = useState(false);
    const dispatch = useDispatch();
    const {login, role}  = useSelector((state) => state.token);
    const { posts, error: postError, loading, showMyPosts } = useSelector((state) => state.post);
    const [expandedPostIndex, setExpandedPostIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);


    useEffect(() => {
        dispatch(Season(login));
    }, [dispatch]);

    const registrationSeason = (login) => {
        dispatch(RegistrationSeason(login));
        Season(login);
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
                await dispatch(unlikePost(item.post.id, login));
                updatedPost = {
                    ...item,
                    liked: false,
                    post: { ...item.post, likes: item.post.likes - 1 } // Уменьшаем количество лайков
                };
            } else {
                await dispatch(likePost(item.post.id, login));
                updatedPost = {
                    ...item,
                    liked: true,
                    post: { ...item.post, likes: item.post.likes + 1 } // Увеличиваем количество лайков
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
            {role === "admin" || seasson ? (
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
                                key={item.post.id}
                                nickName={item.post.curator}
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
                <div className={`no-season-container`}>
                    <div className={`registration`}>
                        <h2 className={`name`}>Registration for the season</h2>
                        <p>Hello! We are happy to welcome you to Buddy Team! This is a unique opportunity to become part
                            of a friendly team where you can develop your skills, find like-minded individuals, and
                            participate in interesting projects.</p><br/>
                        <p>Buddy Team is a community that brings together people with different interests and
                            experiences. We support each other, share knowledge, and help achieve common goals. If you
                            want to learn more about Buddy Team and how you can join us, please sign up for our</p><br/>
                        <p className={`margin-right`}>The new season starts on: <strong>{dateSeason}</strong></p>
                        {buttonStatus ? (
                            <div className={`season-succes margin-left`}>
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M16.3487 0.503235L6.66325 10.1887L1.65005 5.17545L0 6.8255L6.66325 13.4899L17.9999 2.15445L16.3487 0.503235Z"
                                          fill="white"/>
                                </svg>
                                <h3>Registered</h3>
                            </div>
                        ) : (
                            <button className={`btn create-btn margin-left`}
                                    onClick={registrationSeason(login)}>Registration</button>
                        )}
                    </div>
                </div>
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
