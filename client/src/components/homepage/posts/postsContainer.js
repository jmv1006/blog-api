import { CardContainer } from "../home_page_styles";
import PostCard from "../post_card/post_card";

const PostsContainer = (props) => {
  const mappedPosts = props.posts.map((post) => (
    <PostCard key={post.title} post={post} />
  ));

  return (
    <CardContainer>
      {props.isLoading ? "Loading..." : mappedPosts}
      {props.error ? <div>Server Error</div> : null}
    </CardContainer>
  );
};

export default PostsContainer;
