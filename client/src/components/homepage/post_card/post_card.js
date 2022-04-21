import { useEffect } from "react";
import { Card } from "./post_card_styles";

const PostCard = (props) => {

    useEffect(() => {
        console.log(props.post)
    })

    return(
            <Card>
                <div>{props.post.title}</div>
                <div>By: {props.post.author.displayName}</div>
            </Card>
    )
}

export default PostCard;