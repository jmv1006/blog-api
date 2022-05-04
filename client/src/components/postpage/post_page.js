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

const PostPage = () => {
  const params = useParams();

  const { userInfo, authToken } = useContext(AuthContext);

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    FetchPost();
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch(`/posts/${params.postId}/comments`)
      .then((res) => res.json())
      .then((res) => setComments(res))
      .catch((error) => setError(true));
  };

  const FetchPost = () => {
    fetch(`/posts/${params.postId}`)
      .then((res) => res.json())
      .then((res) => setPost(res))
      .catch((error) => setError(true));
  };

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
            fetchComments={fetchComments}
          />
        </PostContentContainer>
      ) : (
        <PostContentContainer>
          {error ? "Error Loading Post" : "Loading..."}
        </PostContentContainer>
      )}
    </PostPageContainer>
  );
};

export default PostPage;
