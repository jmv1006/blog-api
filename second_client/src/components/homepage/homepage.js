import { HomePageContainer, PostsDisplayContainer } from "./home-page-styles";
import { useEffect, useState } from "react";
import PostBox from "./post-box/post-box";
import { Link } from 'react-router-dom';

const HomePage = () => {

    const [posts, setPosts] = useState([])

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
       <Link key={post._id} to={`/manage/post/${post._id}`}><PostBox post={post} fetchPosts={fetchPosts}></PostBox></Link>
    )
    
    const handlePostsConditional = () => {

    }
    return(
        <HomePageContainer>
            <PostsDisplayContainer>
                {mappedPosts}
            </PostsDisplayContainer>
        </HomePageContainer>
    )
}

export default HomePage;