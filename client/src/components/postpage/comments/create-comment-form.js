import { CommentInputBox, CreateCommentForm } from "../post_page_styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetchPost from "../../../hooks/useFetchPost";

const CreateCommentComponent = (props) => {
  const params = useParams();

  const { returnedData, postData, postIsLoading, postError } = useFetchPost(); //URL

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Submit");

  useEffect(() => {
    if (postIsLoading) {
      setSubmitMessage("Submitting...");
    }
  }, [postIsLoading]);

  useEffect(() => {
    //data is returned AND there was no errors with request. (Success)
    if (returnedData && !postError) {
      props.fetchData(`/posts/${params.postId}/comments`);
      setSubmitMessage("Submit");
      setInputValue("");
    }
  }, [returnedData]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const createComment = (e) => {
    e.preventDefault();
    const text = inputValue;
    postData(`/posts/${params.postId}/comments`, { text: text }, props.token);
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
      {error}
      <button type="submit">{submitMessage}</button>
    </CreateCommentForm>
  );
};

export default CreateCommentComponent;
