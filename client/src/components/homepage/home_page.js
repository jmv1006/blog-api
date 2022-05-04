import { useEffect, useState } from "react";
import { HomePageContainer, CardContainer } from "./home_page_styles";
import Welcome from "./welcome/welcome";
import PostsContainer from "./posts/postsContainer";
import useFetch from "../../hooks/useFetch";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const { isError, isLoading, response } = useFetch("/posts");

  useEffect(() => {
    if(response && !isError) {
      setPosts(response)
    }
  }, [response]);

  return (
    <HomePageContainer>
      <Welcome />
      <PostsContainer posts={posts} isLoading={isLoading} error={isError} />
    </HomePageContainer>
  );
};

export default HomePage;
