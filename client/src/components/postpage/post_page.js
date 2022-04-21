import { useParams } from 'react-router-dom';

const PostPage = () => {
    const params = useParams()

    return(
       <div>Post Page, {params.postId}</div>
    )
};

export default PostPage;