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

    const handleInitialRender = () => {
        if(isLoading) {
            return(
                <CardContainer>
                    Loading...
                </CardContainer>
            )
        }
        return(
            <CardContainer>
                {mappedPosts}
            </CardContainer>
        )  
    };

    const handleError = () => {
        if(error) {
            return(
                <div>Server Error</div>
            )
        }
    }

    return(
        <HomePageContainer>
            <Welcome />
            {handleInitialRender()}
            {handleError()}
        </HomePageContainer>
    )
}

export default HomePage;