import { HomePageContainer, PostsDisplayContainer } from "./home-page-styles";
import { useEffect, useState } from "react";
import PostBox from "./post-box/post-box";
import { Link, useOutletContext } from 'react-router-dom';

const HomePage = () => {
    const {userInfo, authToken} = useOutletContext();

    const [posts, setPosts] = useState([])
    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;


    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        fetch('/posts/all')
        .then(res => res.json())
        .then(res => {
            setPosts(res);
        })
    }
  
    const mappedPosts = posts.map((post) => 
       <Link key={post._id} to={`/manage/post/${post._id}`} style={{ textDecoration: 'none' }}><PostBox post={post} fetchPosts={fetchPosts} token={token}></PostBox></Link>
    )
    
    const handlePostsConditional = () => {
        if(user) {
            return(
                <PostsDisplayContainer>
                {mappedPosts}
                </PostsDisplayContainer>
            )
        }
        return <div>Please Sign In</div>
    }

    return(
        <HomePageContainer>
            {handlePostsConditional()}
        </HomePageContainer>
    )
}

export default HomePage;