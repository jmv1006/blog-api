import {
  CreateCommentContainer,
  CommentContainer,
  CommentInputBox,
  CreateCommentForm,
} from "../post_page_styles";
import Comment from "./comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetchGet from "../../../hooks/useFetchGet";

const CommentsComponent = (props) => {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const { fetchData, data, isLoading, error } = useFetchGet(
    `/posts/${params.postId}/comments`
  );

  useEffect(() => {
    if (data != null) {
      setComments(data);
    }
  }, [data]);

  const createComment = (e) => {
    e.preventDefault();
    const text = e.target.text.value;

    const bearerToken = "Bearer " + props.token;

    fetch(`/posts/${params.postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    }).then((res) => {
      if (res.ok) {
        fetchData(`/posts/${params.postId}/comments`);
        e.target.text.value = "";
        return;
      }
      res.json().then((res) => {
        console.log("failed");
      });
    });
  };

  const mappedComments = comments.map((comment) => (
    <Comment key={comment._id} comment={comment}></Comment>
  ));

  const createCommentBox = () => {
    if (props.user) {
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
