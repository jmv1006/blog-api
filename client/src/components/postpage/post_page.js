import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { userInfo, authToken } = useContext(AuthContext);
  const { handleFetch } = useFetch();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  useEffect(() => {
    fetchPosts()
    fetchComments()
  }, [])

  const fetchPosts = () => {
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
    .catch(error => console.log(error))
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
      <PostInfo post={post} />
      <PostComments post={post} user={user} comments={comments}/>
    </PostPage>
  );
};

export default PostPageContainer;
