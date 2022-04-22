import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostPageContainer, AuthorTitleContainer, TitleContainer, TopContainer, PostContentContainer, PostImageContainer, TextContainer, CommentContainer } from './post_page_styles';
import Comment from './comments/comment';

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    //Post Page, {params.postId}
    useEffect(() => {
        fetch(`/posts/${params.postId}`)
        .then(res => {
            if(res.ok) {
                res.json().then(res => {
                    setPost(res)
                    console.log(res.date)
                })
                return
            }
            console.log('failed')
        })

        fetch(`/posts/${params.postId}/comments`)
        .then(res => {
            if(res.ok) {
                res.json().then(res => {
                    setComments(res)
                })
                return
            }
            console.log('failed')
        })
    }, [])

    const mappedComments = comments.map((comment) =>
        <Comment key={comment._id} comment={comment}></Comment>
    )

    return(
       <PostPageContainer>
           {
               post 
               ?
               <PostContentContainer>
                    <TopContainer>
                        <AuthorTitleContainer>
                            <div>By: {post.author.displayName}</div>
                            <div>Published On: {post.date}</div>
                        </AuthorTitleContainer>
                        <TitleContainer>{post.title}</TitleContainer>
                    </TopContainer>
                    <PostImageContainer>Image Here</PostImageContainer>
                    <TextContainer>{post.text}</TextContainer>
                    <CommentContainer>{mappedComments}</CommentContainer>
               </PostContentContainer>
                :
                'Loading...'
           }
       </PostPageContainer>
    )
};

export default PostPage;