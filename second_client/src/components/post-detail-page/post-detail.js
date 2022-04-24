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
  PostActionButton,
} from "./post-detail-styles";
import { useOutletContext, useNavigate } from "react-router-dom";
import PopUpModal from "./popUpModal/pop-up-modal";

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfo, authToken } = useOutletContext();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;
  const [error, setError] = useState('')

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if(user) {
      fetchPost();
      fetchComments();
    } else {
      navigate('/')
    }
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

  const updatePost = () => {
    fetch(`/posts/${params.postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: post.title, text: post.text }),
    }).then((res) => {
      if(res.ok) {
        //Succesfully updated post
        return fetchPost();
      }
      setError('error updating post')
    });
  };

  const handlePopUpModal = () => {
    if (isShown) {
      return <PopUpModal closeModal={closeModal} />;
    }
    return null;
  };

  const openModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  const PostDetailsRender = () => {
    return (
      <PostDetailsWrapper>
        {handlePopUpModal()}
        <PostDetailLeftSide>
          <PageTitle>POST INFO</PageTitle>
          <TitleInputForm>
            Title:
            <input
              type="text"
              placeholder="Post Title"
              onChange={handleChange}
              name="title"
              value={post.title}
            ></input>
          </TitleInputForm>
          <TextInputContainer>
            Text:
            <TextInputArea
              onChange={handleChange}
              name="text"
              value={post.text}
            />
          </TextInputContainer>
        </PostDetailLeftSide>
        <PostDetailRightSide>
          <PostActionButton onClick={updatePost}>Save Changes</PostActionButton>
          <PostActionButton onClick={openModal}>Delete</PostActionButton>
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
