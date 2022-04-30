import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import {
  PostPageContainer,
  AuthorTitleContainer,
  TitleContainer,
  TopContainer,
  PostContentContainer,
  TextContainer,
} from "./post_page_styles";
import Parser from "html-react-parser";
import useFetchGet from '../../hooks/useFetchGet'
import CommentsComponent from "./comments/comments-container";

const PostPage = () => {
  const params = useParams();

  const { userInfo, authToken } = useOutletContext();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);
  const {data, isLoading, error} = useFetchGet(`/posts/${params.postId}`)

  useEffect(() => {
    if(data != null) {
      setPost(data)
    }
  }, [data]);
  
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
          <CommentsComponent token={token} user={user} />
        </PostContentContainer>
      ) : (
        <PostContentContainer>"Loading..."</PostContentContainer>
      )}
    </PostPageContainer>
  );
};

export default PostPage;
