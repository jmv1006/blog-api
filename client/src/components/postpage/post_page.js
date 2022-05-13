import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PostPage,
} from "./post_page_styles";
import AuthContext from "../../contexts/context";
import useFetch from "../../hooks/useFetch";

//Seperate Component
import PostComments from "./comments/comments-container";
import PostInfo from "./post-info/post-info";

const PostPageContainer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { userInfo, authToken } = useContext(AuthContext);
  const { handleFetch } = useFetch();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(false);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [])

  const fetchPost = () => {
    handleFetch(`/posts/${params.postId}`)
    fetch(`/posts/${params.postId}`)
    .then(res => {
      if(!res.ok){
        throw new Error()
      }
      return res.json()
    })
    .then(res => {
      setPost(res)
    })
    .catch(error => setError(true))
  }

  const fetchComments = () => {
    fetch(`/posts/${params.postId}/comments`)
    .then(res => {
      if(!res.ok){
        throw new Error()
      }
      return res.json()
    })
    .then(res => {
      setComments(res)
    })
    .catch(error => console.log(error))
  };
  

  return (
    <PostPage>
      {error && navigate("/error")}
      <PostInfo post={post} />
      <PostComments post={post} user={user} comments={comments} token={token} fetchComments={fetchComments}/>
    </PostPage>
  );
};

export default PostPageContainer;
