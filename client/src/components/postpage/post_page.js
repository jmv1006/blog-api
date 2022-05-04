import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PostPageContainer,
  AuthorTitleContainer,
  TitleContainer,
  TopContainer,
  PostContentContainer,
  TextContainer,
} from "./post_page_styles";
import Parser from "html-react-parser";
import CommentsComponent from "./comments/comments-container";
import AuthContext from "../context";
import useFetch from "../../hooks/useFetch";

const PostPage = () => {
  const params = useParams();
  const { userInfo, authToken } = useContext(AuthContext);
  const { isError, isLoading, response } = useFetch(`/posts/${params.postId}`)

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  useEffect(() => {
    if(response && !isError) {
      setPost(response)
    }
  }, [response])

  /*
  const fetchComments = () => {
    fetch(`/posts/${params.postId}/comments`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json()
      })
      .then(res => {
        setComments(res);
      })
      .catch(error => {
        
      });
  };
  */

  return (
    <PostPageContainer>
      {post ? (
        <PostContentContainer>
          <TopContainer>
            <AuthorTitleContainer>
              <div>By: {post.author.displayName}</div>
              <div>Published On: {post.date}</div>
            </AuthorTitleContainer>
            <TitleContainer>{post.title}</TitleContainer>
          </TopContainer>
          <TextContainer>{Parser(post.text)}</TextContainer>
          <CommentsComponent
            token={token}
            user={user}
            comments={comments}
            setComments={setComments}
            //fetchComments={fetchComments}
          />
        </PostContentContainer>
      ) : (
        <PostContentContainer>
          {isError ? "Error Loading Post" : "Loading..."}
        </PostContentContainer>
      )}
    </PostPageContainer>
  );
};

export default PostPage;
