import { CreateCommentContainer, CommentContainer } from "../post_page_styles";
import Comment from "./comment";
import { useParams, Link } from "react-router-dom";
import CreateCommentComponent from "./create-comment-form";
const PostComments = (props) => {

  const comments = () => {
    if (props.comments) {
      return props.comments.map((comment) => (
        <Comment key={comment.text} comment={comment} />
      ));
    }
    return null;
  };

  const createCommentBox = () => {
    if (props.user) {
      return (
        <CreateCommentContainer>
          Create Comment
          <CreateCommentComponent token={props.token} fetchComments={props.fetchComments}></CreateCommentComponent>
        </CreateCommentContainer>
      );
    }
    return <div><Link to="/sign-in">Sign In</Link> To Post Comments</div>;
  };

  return (
    <CommentContainer>
      {createCommentBox()}
      {comments()}
    </CommentContainer>
  );
};

export default PostComments;
