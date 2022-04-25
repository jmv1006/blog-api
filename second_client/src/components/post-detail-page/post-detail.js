import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PostDetailContainer,
  PostDetailsWrapper,
  PostDetailRightSide,
  PostActionButton,
} from "./post-detail-styles";
import { useOutletContext, useNavigate } from "react-router-dom";
import PopUpModal from "./popUpModal/pop-up-modal";
import PostDetailForm from "./form/post-detail-form";

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { userInfo, authToken } = useOutletContext();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [saveMessage, setSaveMessage] = useState("Save Changes");

  useEffect(() => {
    if (user) {
      fetchPost();
      fetchComments();
    } else {
      navigate("/");
    }
  }, []);

  const fetchPost = () => {
    fetch(`/posts/${params.postId}`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setPost(res);
        });
        return;
      }
      res.json().then((res) => console.log(res));
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
      res.json().then((res) => console.log(res));
      fetchPost();
    });
  };

  const fetchComments = () => {
    fetch(`/posts/${params.postId}/comments`).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setComments(res);
        });
        return;
      }
      res.json().then((res) => console.log(res));
    });
  };

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

        return fetchPost();
      }
      setSaveMessage("Error Saving");
      console.log("error updating post");
    });
  };

  const deletePost = () => {
    console.log('delete')
  }

  const handleDeletePopUpModal = () => {
    return <PopUpModal text="Delete Pop Up" />;
  };

  const handleSuccessPopUpModal = () => {
    return <PopUpModal text="Text Pop Up" />;
  };

  const handlePublishedStatus = () => {
    if (post.isPublished) {
      return "Unpublish";
    }
    return "Publish";
  };

  const PostDetailsRender = () => {
    return (
      <PostDetailsWrapper>
        <PostDetailForm post={post} setPost={setPost} />
        <PostDetailRightSide>
          <PostActionButton onClick={updatePost}>
            {saveMessage}
          </PostActionButton>
          <PostActionButton>Delete</PostActionButton>
          <PostActionButton onClick={togglePostPublishStatus}>
            {handlePublishedStatus()}
          </PostActionButton>
        </PostDetailRightSide>
        {/* comments */}
      </PostDetailsWrapper>
    );
  };

  return (
    <PostDetailContainer>
      {post ? PostDetailsRender() : "Loading post info.."}
    </PostDetailContainer>
  );
};

export default PostDetailPage;
