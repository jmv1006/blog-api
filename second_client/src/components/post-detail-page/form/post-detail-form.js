import {
  PostDetailLeftSide,
  PageTitle,
  TitleInputForm,
  TextInputContainer,
} from "../post-detail-styles";
import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";

const PostDetailForm = (props) => {
  const { userInfo, authToken } = useContext(AuthContext);
  const [token, setToken] = authToken;

  const [apiKey, setAPIKey] = useState("");

  useEffect(() => {
    fetchEditorAPIKey()
  }, []);
  
  const fetchEditorAPIKey = () => {
    fetch("/auth/tinyMCE/apikey", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setAPIKey(res.key));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    props.setPost({
      ...props.post,
      [e.target.name]: value,
    });
  };

  const handleTextChange = (e) => {
    e.target.name = "text";
    const value = e.target.getContent();
    props.setPost({
      ...props.post,
      [e.target.name]: value,
    });
  };

  return (
    <PostDetailLeftSide>
      <PageTitle>Edit Post</PageTitle>
      <TitleInputForm>
        Title:
        <input
          type="text"
          placeholder="Post Title"
          onChange={handleChange}
          name="title"
          value={props.post.title}
        ></input>
      </TitleInputForm>
      <TextInputContainer>
        <Editor
          apiKey={apiKey}
          initialValue={props.post.text}
          onChange={handleTextChange}
          init={{
            width: '90%',
            plugins: "autoresize"
          }}
        />
      </TextInputContainer>
    </PostDetailLeftSide>
  );
};

export default PostDetailForm;
