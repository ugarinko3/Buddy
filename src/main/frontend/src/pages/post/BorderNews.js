import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckToken } from '../token/token'; // Update the path accordingly
import { fetchPosts, deletePost, likePost, unlikePost, updatePostState, toggleMyPosts } from '../../store/slice/postSlice';
import '../../css/post.scss';
import Burger from '../header/header_burger';
import Loading from '../loading/loading';
import AddPost from './addPost';
import ConfirmModal from './configModal';
import Post from './post';

function BorderNews() {
    const dispatch = useDispatch();
    const { login, role } = useCheckToken();
    const { posts, error: postError, loading, showMyPosts } = useSelector((state) => state.post);
    const [expandedPostIndex, setExpandedPostIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

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
            <div className='conteiner-main-news'>
                <Burger />
                <div className='curator-news'>
                    {(role === 'admin' || role === 'curator') && (
                        <div className='button-curator'>
                            <button className={`my-post ${showMyPosts ? 'active' : ''}`} onClick={handleToggleMyPosts}>
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
                            key={item.post.id}
                            role={role}
                            item={item}
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
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={cancelDeletePost}
                onConfirm={confirmDeletePost}
            />
        </div>
    );
}

export default BorderNews;
