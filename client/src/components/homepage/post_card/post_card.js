import { useEffect } from "react";
import { Card } from "./post_card_styles";
import { Link } from 'react-router-dom';

const PostCard = (props) => {

    useEffect(() => {
        console.log(props.post)
    })

    return(
        <Link to={`/post/${props.post._id}`}>
            <Card>
                {props.post.title}, By: {props.post.author.displayName}
            </Card>
        </Link>
    )
}

export default PostCard;