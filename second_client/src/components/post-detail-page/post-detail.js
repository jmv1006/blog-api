import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PostDetailContainer,
  PostDetailsWrapper,
  PostDetailLeftSide,
  PostDetailRightSide,
  PageTitle,
  TitleInputForm,
  TextInputContainer,
  TextInputArea,
  PostActionButton
} from "./post-detail-styles";

const PostDetailPage = () => {
  const params = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    console.log("mounted");
    fetchPost();
    fetchComments();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setPost({
      ...post,
      [e.target.name]: value,
    });
  };

  const fetchPost = () => {
    fetch(`/posts/${params.postId}`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setPost(res);
        });
        return;
      }
      res.json().then((res) => console.log(res));
    });
  };

  const fetchComments = () => {
    fetch(`/posts/${params.postId}/comments`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setComments(res);
        });
        return;
      }
      res.json().then((res) => console.log(res));
    });
  };

  const PostDetailsRender = () => {
    return (
      <PostDetailsWrapper>
        <PostDetailLeftSide>
          <PageTitle>POST INFO</PageTitle>
          <TitleInputForm>
              Title: 
              <input type='text' placeholder="Post Title" onChange={handleChange} name="title" value={post.title}></input>
          </TitleInputForm>
          <TextInputContainer>
              Text:
              <TextInputArea onChange={handleChange} name="text" value={post.text} />
          </TextInputContainer>
        </PostDetailLeftSide>
        <PostDetailRightSide>
            <PostActionButton>Delete</PostActionButton>
            <PostActionButton>Publish</PostActionButton>
        </PostDetailRightSide>
      </PostDetailsWrapper>
    );
  };

  return (
    <PostDetailContainer>
      {post ? PostDetailsRender() : "Loading post info.."}
    </PostDetailContainer>
  );
};

export default PostDetailPage;
