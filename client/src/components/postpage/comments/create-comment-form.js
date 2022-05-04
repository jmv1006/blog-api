import { CommentInputBox, CreateCommentForm } from "../post_page_styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const CreateCommentComponent = (props) => {
  const params = useParams();

  const [inputValue, setInputValue] = useState("");
  const [submitMessage, setSubmitMessage] = useState("Submit");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const createComment = (e) => {
    e.preventDefault();
    const text = inputValue;
    setSubmitMessage("Submitting...");

    fetch(`/posts/${params.postId}/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + props.token,
      },
      body: JSON.stringify({ text: text }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitMessage("Submit");
        setInputValue("");
        props.fetchComments();
      })
      .catch((error) => {
        if (error) {
          setSubmitMessage("Error");
        }
      });
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
      <button type="submit">{submitMessage}</button>
    </CreateCommentForm>
  );
};

export default CreateCommentComponent;
