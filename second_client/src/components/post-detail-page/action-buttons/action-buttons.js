import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostDetailRightSide } from "../post-detail-styles";
import { PostActionButton } from "./action-buttons-styles";
import Modal from "../../modal/modal";
import useTestFetch from "../../../hooks/useTest";

const ActionButtons = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, response, isError, postData } = useTestFetch();

  const [saveMessage, setSaveMessage] = useState("Save Changes");
  const [publishStatus, setPublishedStatus] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState("Delete");

  const post = props.post;
  const token = props.token;

  useEffect(() => {
    if (post.isPublished) {
      return setPublishedStatus("Unpublish");
    }
    setPublishedStatus("Publish");
  });

  useEffect(() => {
    if (response) {
      if (response.isDeleted) {
        navigate("/");
        return;
      }
      props.handleFetch(`/posts/${params.postId}`);
      setSaveMessage("Save Changes");
    }
  }, [response]);

  const updatePost = () => {
    const body = { title: post.title, text: post.text };
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    };
    setSaveMessage("Saving...");
    postData(`/posts/${params.postId}`, options);
  };

  const togglePostPublishStatus = () => {
    const body = { isPublished: post.isPublished ? true : false };
    const options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    };
    postData(`/posts/${params.postId}/toggle-publish`, options);
  };

  const deletePost = () => {
    setDeleteStatus("Deleting...");
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    postData(`/posts/${params.postId}`, options);
  };

  return (
    <PostDetailRightSide>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={"Are you sure you want to delete this post?"}
        actionButtonText={deleteStatus}
        action={deletePost}
      />
      <PostActionButton onClick={updatePost}>{saveMessage}</PostActionButton>
      <PostActionButton onClick={() => setIsOpen(true)}>
        Delete
      </PostActionButton>
      <PostActionButton onClick={togglePostPublishStatus}>
        {publishStatus}
      </PostActionButton>
    </PostDetailRightSide>
  );
};

export default ActionButtons;