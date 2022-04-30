import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostDetailRightSide } from "../post-detail-styles";
import { PostActionButton } from "./action-buttons-styles";

const ActionButtons = (props) => {
  const params = useParams();

  const [saveMessage, setSaveMessage] = useState("Save Changes");
  const [publishStatus, setPublishedStatus] = useState("");

  const post = props.post;
  const token = props.token;

  useEffect(() => {
      if(post.isPublished) {
          setPublishedStatus('Unpublish')
          return
      }
      setPublishedStatus('Publish')
  })
  
  const updatePost = () => {
    setSaveMessage("Saving...");
    fetch(`/posts/${params.postId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: post.title, text: post.text }),
    }).then((res) => {
      if (res.ok) {
        //Succesfully updated post
        setSaveMessage("Saved!");

        setTimeout(() => {
          setSaveMessage("Save Changes");
        }, 1500);

        return props.fetchPost();
      }
      setSaveMessage("Error Saving");
    });
  };

  const togglePostPublishStatus = () => {
    fetch(`/posts/${post._id}/toggle-publish`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ isPublished: post.isPublished }),
    }).then((res) => {
      res.json().then((res) => {
          console.log(res)
          if(res.isPublished) {
              setPublishedStatus('Unpublish')
          }
          setPublishedStatus('Publish')
      })
      props.fetchPost();
    });
  };

  return (
    <PostDetailRightSide>
      <PostActionButton onClick={updatePost}>{saveMessage}</PostActionButton>
      <PostActionButton>Delete</PostActionButton>
      <PostActionButton onClick={togglePostPublishStatus}>
        {publishStatus}
      </PostActionButton>
    </PostDetailRightSide>
  );
};

export default ActionButtons;
