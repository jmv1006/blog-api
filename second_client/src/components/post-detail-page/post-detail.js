import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  PostDetailContainer,
  PostDetailsWrapper,
  PostDetailTopContainer
} from "./post-detail-styles";
import { useNavigate } from "react-router-dom";
import PostDetailForm from "./form/post-detail-form";
import PostComments from "./comments/post-comments";
import ActionButtons from "./action-buttons/action-buttons";
import AuthContext from "../../contexts/AuthContext";

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { userInfo, authToken } = useContext(AuthContext);
  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPost();
    } else {
      navigate("/");
    }
  }, []);

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

  const PostDetailsRender = () => {
    return (
      <PostDetailsWrapper>
        <PostDetailTopContainer>
          {/* Form for post text and title */}
          <PostDetailForm post={post} setPost={setPost} />
          {/* Buttons for saving, deleting, and publishing */}
          <ActionButtons post={post} token={token} fetchPost={fetchPost}/>
        </PostDetailTopContainer>
        { /*Post comments container */}
        <PostComments token={token}/>
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