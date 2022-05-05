import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsContainer } from "./comment-styles";
import Comment from "./comment";

const PostComments = (props) => {
    const params = useParams();

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = () => {
        fetch(`/posts/${params.postId}/comments`).then((res) => {
          if (res.ok) {
            res.json().then((res) => {
             props.setComments(res)
            });
            return;
          }
          res.json().then((res) => console.log(res));
        });
    };

    const mappedComments = props.comments.map((comment) => 
        <Comment key={comment._id} comment={comment} fetchComments={fetchComments}></Comment>
    )

    const handleComments = () => {
        
    }

    return(
        <CommentsContainer>
            All comments:
            {mappedComments}
            <div>{props.comments.length === 0 && "Post Has No Comments"}</div>
            <div>{!props.comments && "Error Getting Comments"}</div>
        </CommentsContainer>
    )
};

export default PostComments;