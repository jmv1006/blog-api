import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  PostDetailContainer,
  PostDetailsWrapper,
  PostDetailTopContainer,
} from "./post-detail-styles";
import { useNavigate } from "react-router-dom";
import PostDetailForm from "./form/post-detail-form";
import PostComments from "./comments/post-comments";
import ActionButtons from "./action-buttons/action-buttons";
import AuthContext from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isError, isLoading, response, handleFetch } = useFetch(
    `/posts/${params.postId}`
  );

  const { userInfo, authToken } = useContext(AuthContext);
  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (response) {
      setPost(response);
    }
  }, [response]);

  const PostDetailsRender = () => {
    return (
      <PostDetailsWrapper>
        <PostDetailTopContainer>
          {/* Form for post text and title */}
          <PostDetailForm post={post} setPost={setPost} />
          {/* Buttons for saving, deleting, and publishing */}
          <ActionButtons
            post={post}
            isPublished={post.isPublished}
            handleFetch={handleFetch}
            token={token}
          />
        </PostDetailTopContainer>
        {/*Post comments container */}
        <PostComments
          token={token}
          setComments={setComments}
          comments={comments}
        />
      </PostDetailsWrapper>
    );
  };

  return (
    <PostDetailContainer>
      {post ? PostDetailsRender() : null}
      {isLoading && "Loading Post Info..."}
      {isError && "Error Loading Post Info"}
    </PostDetailContainer>
  );
};

export default PostDetailPage;