import { PostBoxContainer } from "./post-box-styles"
import { useState, useEffect } from 'react'

const PostBox = (props) => {

    const [post, setPost] = useState({
        isPublished: null,
        title: '',
        author: {
            displayName: ''
        }
    })
    
    useEffect(() => {
        setPost(props.post)
    })


    const togglePostPublishStatus = () => {
        fetch(`/posts/${post._id}/toggle-publish`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isPublished: post.isPublished})
        })
        .then(res => {
            if(res.ok) {
                //Successful
                props.fetchPosts()
                return
            }
            res.json().then(res => console.log(res))
        })
    }

    const isPublishedConditionalRender = () => {
        if(post.isPublished) {
            return <button onClick={togglePostPublishStatus}>Unpublish</button>
        }
        return <button onClick={togglePostPublishStatus}>Publish</button>
    }

    return(
        <PostBoxContainer>
            {post.title}:
            {post.author.displayName}:
            {isPublishedConditionalRender()}
        </PostBoxContainer>
    )
}

export default PostBox