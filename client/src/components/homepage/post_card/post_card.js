import { Card, CardTitle, CardAuthor } from "./post_card_styles";
import { Link } from 'react-router-dom';

const PostCard = (props) => {
    const post = props.post;
    return(
        <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
            <Card>
                <CardTitle>{post.title}</CardTitle>
                <CardAuthor>By: {post.author.displayName}</CardAuthor>
            </Card>
        </Link>
    )
}

export default PostCard;