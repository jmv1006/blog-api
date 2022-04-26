import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsContainer } from "./comment-styles";
import Comment from "./comment";

const PostComments = (props) => {
    const params = useParams();

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = () => {
        fetch(`/posts/${params.postId}/comments`).then((res) => {
          if (res.ok) {
            res.json().then((res) => {
             setComments(res)
            });
            return;
          }
          res.json().then((res) => console.log(res));
        });
    };

    const mappedComments = comments.map((comment) => 
        <Comment key={comment._id} comment={comment} fetchComments={fetchComments}></Comment>
    )

    return(
        <CommentsContainer>
            All comments:
            {mappedComments}
        </CommentsContainer>
    )
};

export default PostComments;