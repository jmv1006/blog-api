import { useEffect, useState } from "react";
import PostCard from "./post_card/post_card";
import { HomePageContainer, CardContainer } from "./home_page_styles";

const HomePage = () => {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then(res => processPosts(res))
    }, [])

    const processPosts = (postsArr) => {  
        setPosts(postsArr)
    }

    const mappedPosts = posts.map((post) =>
        <PostCard key={post._id} post={post} />
    )

    return(
        <HomePageContainer>
            Home Page
            <CardContainer>
                {mappedPosts}
            </CardContainer>
        </HomePageContainer>
    )
}

export default HomePage;