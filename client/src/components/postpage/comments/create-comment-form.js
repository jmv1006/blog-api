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
    postComment()
  };

  const postComment = () => {
     fetch(`/posts/${params.postId}/comments`, {
       method: "POST",
       headers: {
         authorization: "Bearer " + props.token,
         Accept: "application/json",
          "Content-Type": "application/json",
       },
       body: JSON.stringify({"text": inputValue})
     })
     .then(res => {
       if(!res.ok) {
        throw new Error()
       }
       return res.json()
     })
     .then(res => {
       setInputValue("")
       props.fetchComments()
     })
     .catch(error => {
       //console.log(error)
     })
  }

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