import { HomePageContainer, PostsDisplayContainer } from "./home-page-styles";
import { useContext, useEffect, useState } from "react";
import PostBox from "./post-box/post-box";
import { Link } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

const HomePage = (props) => {
    const {userInfo, authToken} = useContext(AuthContext);
    const { isError, isLoading, response, handleFetch } = useFetch('/posts/all')
    const [posts, setPosts] = useState([])
    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;

    useEffect(() => {
        if(response) {
            setPosts(response)
        }
    }, [response])

  
    const mappedPosts = posts.map((post) => 
       <Link key={post._id} to={`/manage/post/${post._id}`} style={{ textDecoration: 'none' }}><PostBox post={post} token={token}></PostBox></Link>
    )
    
    const handleHomePage = () => {
        if(mappedPosts.length > 0) {
            return <PostsDisplayContainer>{mappedPosts}</PostsDisplayContainer>
        }
        return <div>No Posts!</div>
    };

    return(
        <HomePageContainer>
            {user ? handleHomePage() : "Sign In To Access"}
            {isLoading && user ? "Loading Posts..." : null}
            {isError && user ? "Error Loading Posts" : null}
        </HomePageContainer>
    )
}

export default HomePage;