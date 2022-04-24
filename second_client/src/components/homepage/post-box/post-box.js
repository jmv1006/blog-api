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

  const togglePostPublishStatus = () => {
    fetch(`/posts/${post._id}/toggle-publish`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + props.token
      },
      body: JSON.stringify({ isPublished: post.isPublished }),
    }).then((res) => {
      console.log(res)
      res.json().then(res => console.log(res))
    });
  };

  const isPublishedConditionalRender = () => {
    if (post.isPublished) {
      return <button onClick={togglePostPublishStatus}>Unpublish</button>;
    }
    return <button onClick={togglePostPublishStatus}>Publish</button>;
  };

  return (
    <PostBoxContainer>
      <PostBoxTitle>{post.title}</PostBoxTitle>
      By: {post.author.displayName}
      {isPublishedConditionalRender()}
    </PostBoxContainer>
  );
};

export default PostBox;