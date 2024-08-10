import React, { useState, useEffect } from 'react';


function BorderNews() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function showFullText() {
        document.getElementById('truncateText').classList.toggle("valerakrutoy123");
    }

    useEffect(() => {
        fetch('/post')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const showPost = (index) => {
        const newPosts = [...posts];
        newPosts[index].showFullText = !newPosts[index].showFullText;
        setPosts(newPosts);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    return(
        <div className='curator-news'>
            {posts.map((post, index) => (
                <div key={index} className='post'>
                    <div className='NameBuddy'>
                        <div className='profile-public-news'>
                            <div className='image-news-avatar'>
                                <img src={post.urlAvatar} alt=''></img>
                            </div>
                            <div className='name-curator-a-href'>
                                <h3>{post.teamName}</h3>
                                <a href=''>Team#{post.teamNumber}</a>
                            </div>
                        </div>
                        <p>{post.date}</p>
                    </div>
                    <div className='image-news'>
                        <img src={post.urlPostImage} alt='' />
                    </div>
                    <div className='like'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.314 6.18333L11.6642 5.55288C11.5296 5.42238 11.4002 5.29733 11.2744 5.17585C11.0546 4.96351 10.8461 4.76206 10.6415 4.56141C9.00072 2.95363 6.74236 2.49843 4.93299 3.27967L4.93283 3.27973C3.11907 4.06244 1.85702 6.05591 1.90111 8.28774L1.90111 8.2878C1.93442 9.97965 2.64327 11.4798 3.67634 12.964L3.67663 12.9644C5.93146 16.2077 8.99036 18.6439 12.2533 21.0298C14.6308 19.2988 16.895 17.5125 18.8503 15.3974L19.5111 16.0083L18.8503 15.3974C20.5094 13.6026 21.8746 11.7871 22.4325 9.53909L22.4326 9.53886C23.0207 7.17223 22.0148 4.70667 20.1001 3.55451L12.314 6.18333ZM12.314 6.18333L12.9405 5.52971M12.314 6.18333L12.9405 5.52971M12.9405 5.52971C13.0847 5.37935 13.212 5.24125 13.3317 5.11141C13.5615 4.86221 13.7633 4.64342 14.0019 4.42667L14.0023 4.42636M12.9405 5.52971L14.0023 4.42636M14.0023 4.42636C15.8653 2.73241 18.2782 2.4589 20.1 3.55442L14.0023 4.42636ZM12.0873 21.1505C12.0875 21.1503 12.0877 21.1502 12.088 21.15C12.0878 21.1501 12.0875 21.1503 12.0873 21.1504L12.0873 21.1505ZM12.1764 21.1002L12.1835 21.0999C12.1896 21.0997 12.2038 21.0997 12.225 21.1022C12.2453 21.1045 12.2813 21.1102 12.3278 21.1253C12.3732 21.1402 12.444 21.169 12.5215 21.2254L12.1764 21.1002Z" fill="white" stroke="white" stroke-width="1.8"/>
                        </svg>
                        <p>{post.likes} Likes</p>
                    </div>
                    <div className='comment'>
                        <div className='name-patricipant'>
                        <p id='truncateText' className='valerakrutoy123'><a href='!#'>Nickname: {post.curator}<br></br></a>{post.comment}</p>
                        <span onClick={showFullText}>more</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default BorderNews;