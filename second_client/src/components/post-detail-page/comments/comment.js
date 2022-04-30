import { useEffect, useState } from "react";
import { SingleCommentContainer, CommentAuthorAndDelete, SaveChangesButton, EditCommentForm } from "./comment-styles";
import { useOutletContext, useParams } from "react-router-dom";

const Comment = (props) => {

    const [text, setText] = useState({
        text: ''
    });
    const[buttonText, setButtonText] = useState('Save')

    const params = useParams();
    const { userInfo, authToken } = useOutletContext();
    const [token, setToken] = authToken;

    useEffect(() => {
        setText({
            text: props.comment.text
        })
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
       setText({
          ...text,
          [e.target.name]: value,
        });
    };

    const submitCommentChanges = (e) => {
        setButtonText('Saving...')
        e.preventDefault()
        fetch(`/posts/${params.postId}/comments/${props.comment._id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({text: text.text})
        })
        .then(res => {
            if(res.ok) {
                props.fetchComments()
                setButtonText('Success')
                setTimeout(() => {
                    setButtonText("Save");
                  }, 1500);
                return
            }
            //Failed to update comment
            setButtonText('Error Saving')
        })
    }

    const deleteComment = () => {
        fetch(`/posts/${params.postId}/comments/${props.comment._id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        })
        .then(res => {
            if(res.ok) {
                props.fetchComments()
                return
            }
        })
    };


    return(
        <SingleCommentContainer>
            <CommentAuthorAndDelete>
                <div>{props.comment.author.displayName}</div>
                <button onClick={deleteComment}>X</button>
            </CommentAuthorAndDelete>
            <div>
                <EditCommentForm onSubmit={submitCommentChanges}>
                    <input type='text' name="text" value={text.text} onChange={handleChange}></input>
                    <input type="submit" hidden />
                    <SaveChangesButton type="submit">{buttonText}</SaveChangesButton>
                </EditCommentForm>
            </div>
        </SingleCommentContainer>
    )
}

export default Comment;