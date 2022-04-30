import { useEffect, useState } from "react";
import PostCard from "./post_card/post_card";
import { HomePageContainer, CardContainer } from "./home_page_styles";
import Welcome from "./welcome/welcome";
import useFetchGet from '../../hooks/useFetchGet';

const HomePage = () => {
    
    const [posts, setPosts] = useState([]);
    const { data, isLoading, error } = useFetchGet('/posts');

    useEffect(() => {
       if(data === null) {
           return
       }
        setPosts(data)
    }, [data])
    

    const mappedPosts = posts.map((post) =>
        <PostCard key={post._id} post={post} />
    );

    return(
        <HomePageContainer>
            <Welcome />
            {isLoading ? <CardContainer>Loading...</CardContainer> : <CardContainer>{mappedPosts}</CardContainer>}
            {error ? <div>Server Error</div> : null}
        </HomePageContainer>
    )
}

export default HomePage;