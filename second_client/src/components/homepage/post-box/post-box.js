import { PostBoxContainer, PostBoxTitle } from "./post-box-styles";
import { useState, useEffect } from "react";

const PostBox = (props) => {

  const [post, setPost] = useState({
    isPublished: null,
    title: "",
    author: {
      displayName: "",
    },
  });

  useEffect(() => {
    setPost(props.post);
  });

  return (
    <PostBoxContainer>
      <PostBoxTitle>{post.title}</PostBoxTitle>
      By: {post.author.displayName}
    </PostBoxContainer>
  );
};

export default PostBox;