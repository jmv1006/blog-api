import { useEffect, useState } from "react";
import PostCard from "./post_card/post_card";
import { HomePageContainer, CardContainer } from "./home_page_styles";
import Welcome from "./welcome/welcome";

const HomePage = () => {
    
    const [posts, setPosts] = useState([]);
    const [blankPageMessage, setBlankPageMessage] = useState('')

    useEffect(() => {
        fetch('/posts')
        .then(res => {
            if(res.ok) {
                res.json().then(res => {
                    if(res.length === 0) {
                        setBlankPageMessage('No Posts To Show!')
                    }
                    processPosts(res)
                })
                return
            }
            setBlankPageMessage('Error Fetching Posts')
        })
    }, [])

    const processPosts = (postsArr) => {  
        setPosts(postsArr)
    };

    const mappedPosts = posts.map((post) =>
        <PostCard key={post._id} post={post} />
    );

    return(
        <HomePageContainer>
            <Welcome />
            <CardContainer>
                {mappedPosts}
                {blankPageMessage}
            </CardContainer>
        </HomePageContainer>
    )
}

export default HomePage;