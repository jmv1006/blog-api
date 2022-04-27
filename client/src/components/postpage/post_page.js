import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import {
  PostPageContainer,
  AuthorTitleContainer,
  TitleContainer,
  TopContainer,
  PostContentContainer,
  CreateCommentContainer,
  TextContainer,
  CommentContainer,
  CommentInputBox,
  CreateCommentForm
} from "./post_page_styles";
import Parser from 'html-react-parser'
import Comment from "./comments/comment";

const PostPage = () => {
  const params = useParams();

  const { userInfo, authToken } = useOutletContext();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetch(`/posts/${params.postId}`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setPost(res);
          console.log(res.date);
        });
        return;
      }
      console.log("failed");
    });

    fetch(`/posts/${params.postId}/comments`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setComments(res);
        });
        return;
      }
      console.log("failed");
    });
  }, []);

  const fetchCommentsAgain = () => {
    fetch(`/posts/${params.postId}/comments`).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            setComments(res);
          });
          return;
        }
        console.log("failed");
      });
  }

  const createComment = (e) => {
      e.preventDefault()
      const text = e.target.text.value

      const bearerToken = 'Bearer ' + token;

      fetch(`/posts/${params.postId}/comments`, {
          method: 'POST',
          headers: {
            'Authorization': bearerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({text: text})
      })
      .then(res => {
          if(res.ok) {
              fetchCommentsAgain()
              e.target.text.value = ''
              return
          }
          res.json().then(res => {
              console.log("failed")
          })
      })
    }

  const mappedComments = comments.map((comment) => (
    <Comment key={comment._id} comment={comment}></Comment>
  ));
  
  const createCommentBox = () => {
    if (user) {
      return (
        <CreateCommentContainer>
          Create Comment
          <CreateCommentForm onSubmit={createComment}>
            <CommentInputBox
              type="text"
              placeholder="Comment Here..."
              name="text"
              required
            ></CommentInputBox>
            <button type="submit">Submit</button>
          </CreateCommentForm>
        </CreateCommentContainer>
      );
    }
    return <div>Sign in to post comments!</div>
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
          <CommentContainer>
            Comments:
            {createCommentBox()}
            {mappedComments}
          </CommentContainer>
        </PostContentContainer>
      ) : (
        "Loading..."
      )}
    </PostPageContainer>
  );
};

export default PostPage;