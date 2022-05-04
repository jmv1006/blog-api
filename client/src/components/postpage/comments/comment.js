import {
  IndividualCommentCont,
  CommentAuthor,
  CommentText,
} from "./comment_styles";

const Comment = (props) => {
  return (
    <IndividualCommentCont>
      <CommentAuthor>By: {props.comment.author.displayName}</CommentAuthor>
      <CommentText>{props.comment.text}</CommentText>
    </IndividualCommentCont>
  );
};

export default Comment;
