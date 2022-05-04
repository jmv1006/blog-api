import { useEffect, useState } from "react";
import { HomePageContainer, CardContainer } from "./home_page_styles";
import Welcome from "./welcome/welcome";
import PostsContainer from "./posts/postsContainer";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setIsLoading(true);
    fetch("/posts")
      .then((res) => res.json())
      .then((res) => {
        setPosts(res);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <HomePageContainer>
      <Welcome />
      <PostsContainer posts={posts} isLoading={isLoading} error={error} />
    </HomePageContainer>
  );
};

export default HomePage;
