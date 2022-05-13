import { useEffect, useState } from "react";
import { HomePageContainer, CardContainer } from "./home_page_styles";
import Welcome from "./welcome/welcome";
import PostsContainer from "./posts/postsContainer";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const { isError, isLoading, response, handleFetch } = useFetch();

  useEffect(() => {
    handleFetch('/posts')
  }, [])

  useEffect(() => {
      if(response) {
        setPosts(response)
      }
  }, [response]);

  return (
    <HomePageContainer>
      <Welcome />
      <PostsContainer posts={posts} isLoading={isLoading} error={isError} />
      {isError && navigate("/error")}
    </HomePageContainer>
  );
};

export default HomePage;
