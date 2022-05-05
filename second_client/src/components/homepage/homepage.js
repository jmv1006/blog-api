import { HomePageContainer, PostsDisplayContainer } from "./home-page-styles";
import { useContext, useEffect, useState } from "react";
import PostBox from "./post-box/post-box";
import { Link } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";

const HomePage = () => {
    const {userInfo, authToken} = useContext(AuthContext);

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
    
    return(
        <HomePageContainer>
            {user ? <PostsDisplayContainer>{mappedPosts.length > 0 ? mappedPosts: "Loading Posts..."}</PostsDisplayContainer> : "Sign In To Access"}
        </HomePageContainer>
    )
}

export default HomePage;