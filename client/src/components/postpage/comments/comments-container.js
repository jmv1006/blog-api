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
    if (props.user) {
      return (
        <CreateCommentContainer>
          Create Comment
          <CreateCommentComponent token={props.token} fetchData={fetchData}/>
        </CreateCommentContainer>
      );
    }
    return <div>Sign in to post comments!</div>;
  };

  return (
    <CommentContainer>
      Comments:
      {createCommentBox()}
      {mappedComments}
    </CommentContainer>
  );
};

export default CommentsComponent;