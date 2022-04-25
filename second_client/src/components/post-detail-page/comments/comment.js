import { SingleCommentContainer, CommentAuthorAndDelete } from "./comment-styles";

const Comment = (props) => {

    return(
        <SingleCommentContainer>
            <CommentAuthorAndDelete>
                <div>{props.comment.author.displayName}</div>
                <button>X</button>
            </CommentAuthorAndDelete>
            <div>
                {props.comment.text}
            </div>
        </SingleCommentContainer>
    )
}

export default Comment;