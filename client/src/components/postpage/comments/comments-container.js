import { CreateCommentContainer, CommentContainer } from "../post_page_styles";
import Comment from "./comment";
import { useParams, Link } from "react-router-dom";
import CreateCommentComponent from "./create-comment-form";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";

const CommentsComponent = (props) => {
  const params = useParams();
  const { isError, isLoading, response, handleFetch } = useFetch(
    `/posts/${params.postId}/comments`
  ); 

  useEffect(() => {
    if (response && !isError) {
      props.setComments(response);
    }
  }, [response]);

  const mappedComments = () =>
    props.comments.map((comment) => (
      <Comment key={comment._id} comment={comment}></Comment>
  ));

  const createCommentBox = () => {
    return (
      <CreateCommentContainer>
        Create Comment
        <CreateCommentComponent token={props.token} handleFetch={handleFetch}/>
      </CreateCommentContainer>
    );
  };

  return (
    <CommentContainer>
      Comments:
      {props.user ? (
        createCommentBox()
      ) : (
        <h3>
          <Link to="/sign-in">Sign In To Post Comments</Link>
        </h3>
      )}
      {props.comments.length > 0 ? mappedComments() : "Post Has No Comments"}
      {isLoading ? "Loading Comments..." : null}
    </CommentContainer>
  );
};

export default CommentsComponent;
