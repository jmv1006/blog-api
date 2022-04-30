import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  CreatePostContainer,
  CreatePostForm,
  PageTitle,
} from "./create-post-styles";
import { PostActionButton } from "../post-detail-page/action-buttons/action-buttons-styles";

const CreatePost = () => {
  const navigate = useNavigate();

  const { userInfo, authToken } = useOutletContext();
  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [formData, setFormData] = useState("");
  const [title, setTitle] = useState("");
  const [publishStatus, setPublishStatus] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  const onTextChange = (e) => {
    setFormData(e.target.getContent());
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

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
      .then((res) => {
        const key = res.key;
        return key;
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/posts/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: title,
        text: formData,
        isPublished: publishStatus,
      }),
    }).then((res) => {
      if (res.ok) {
        navigate("/");
        return;
      }
    });
  };

  return (
    <CreatePostContainer>
      <PageTitle>Create New Post</PageTitle>
      <CreatePostForm onSubmit={onSubmit}>
        Title:
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={onTitleChange}
          value={title}
          required
        ></input>
        <Editor
          apiKey={fetchEditorAPIKey()}
          onChange={onTextChange}
          init={{ width: "100%", min_height: "60", plugins: "autoresize" }}
        />
        <PostActionButton type="submit" onClick={() => setPublishStatus(true)}>
          Create and Publish
        </PostActionButton>
        <PostActionButton type="submit" onClick={() => setPublishStatus(false)}>
          Save As Draft
        </PostActionButton>
      </CreatePostForm>
    </CreatePostContainer>
  );
};
export default CreatePost;
