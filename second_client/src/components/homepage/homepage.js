import { HomePageContainer, PostsDisplayContainer } from "./home-page-styles";
import { useEffect, useState } from "react";
import PostBox from "./post-box/post-box";

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
       <PostBox key={post._id} post={post} fetchPosts={fetchPosts}></PostBox>
    )

    return(
        <HomePageContainer>
            <PostsDisplayContainer>
                {mappedPosts}
            </PostsDisplayContainer>
        </HomePageContainer>
    )
}

export default HomePage;