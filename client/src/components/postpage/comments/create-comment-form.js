import { CommentInputBox, CreateCommentForm } from "../post_page_styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePost from "../../../hooks/usePost";

const CreateCommentComponent = (props) => {
  const params = useParams();
  const { postData, isLoading, error, isSuccessful } = usePost();

  const [inputValue, setInputValue] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Submit");

  useEffect(() => {
    if(isSuccessful){
      setSubmitMessage("Submit");
      setInputValue("");
      props.handleFetch(`/posts/${params.postId}/comments`);
    }
  }, [isSuccessful])

  useEffect(() => {
    if(error) {
      setSubmitMessage("Submit")
    }
  }, [error])

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const createComment = (e) => {
    e.preventDefault();
    const body = {
      text: inputValue
    }
    setSubmitMessage("Submitting...")
    postData(`/posts/${params.postId}/comments`, props.token, body)
  };

  return (
    <CreateCommentForm onSubmit={createComment}>
      <CommentInputBox
        type="text"
        placeholder="Comment Here..."
        name="text"
        value={inputValue}
        onChange={handleChange}
        required
      ></CommentInputBox>
      {error ? "Error Posting Comment" : null}
      <button type="submit">{submitMessage}</button>
    </CreateCommentForm>
  );
};

export default CreateCommentComponent;
