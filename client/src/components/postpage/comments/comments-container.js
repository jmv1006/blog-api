import { CreateCommentContainer, CommentContainer } from "../post_page_styles";
import Comment from "./comment";
import { useParams, Link } from "react-router-dom";
import CreateCommentComponent from "./create-comment-form";

const CommentsComponent = (props) => {
  const params = useParams();

  const mappedComments = () =>
    props.comments.map((comment) => (
      <Comment key={comment.text} comment={comment}></Comment>
    ));

  const createCommentBox = () => {
    return (
      <CreateCommentContainer>
        Create Comment
        <CreateCommentComponent
          token={props.token}
          fetchComments={props.fetchComments}
        />
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
      {props.comments ? mappedComments() : "No Comments"}
    </CommentContainer>
  );
};

export default CommentsComponent;
