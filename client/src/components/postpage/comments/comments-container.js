import {
  CreateCommentContainer,
  CommentContainer
} from "../post_page_styles";
import Comment from "./comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetchGet from "../../../hooks/useFetchGet";
import CreateCommentComponent from "./create-comment-form";

const CommentsComponent = (props) => {
  const params = useParams();

  const { fetchData, data, isLoading, getError } = useFetchGet(
    `/posts/${params.postId}/comments`
  );

  const [comments, setComments] = useState([]);

  useEffect(() => {
    if(data && !getError) {
      setComments(data)
    }
  }, [data])

  const mappedComments = comments.map((comment) => (
    <Comment key={comment._id} comment={comment}></Comment>
  ));

  const createCommentBox = () => {
    return (
      <CreateCommentContainer>
        Create Comment
        <CreateCommentComponent token={props.token} fetchData={fetchData}/>
      </CreateCommentContainer>
    );
  };

  return (
    <CommentContainer>
      Comments:
      {props.user ? createCommentBox(): <h3>Sign In To Post Comments</h3>}
      {comments.length > 0 ? mappedComments : <div>No Comments Here!</div>}
    </CommentContainer>
  );
};

export default CommentsComponent;