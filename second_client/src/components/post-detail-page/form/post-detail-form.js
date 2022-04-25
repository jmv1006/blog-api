import {
    PostDetailLeftSide,
    PageTitle,
    TitleInputForm,
    TextInputContainer,
    TextInputArea,
  } from "../post-detail-styles";

const PostDetailForm = (props) => {

    const handleChange = (e) => {
        const value = e.target.value;
    
        props.setPost({
          ...props.post,
          [e.target.name]: value,
        });
      };

    return(
        <PostDetailLeftSide>
            <PageTitle>POST INFO</PageTitle>
            <TitleInputForm>
            Title:
            <input
                type="text"
                placeholder="Post Title"
                onChange={handleChange}
                name="title"
                value={props.post.title}
            ></input>
            </TitleInputForm>
            <TextInputContainer>
            Text:
            <TextInputArea
                onChange={handleChange}
                name="text"
                value={props.post.text}
            />
            </TextInputContainer>
      </PostDetailLeftSide>
    )
}

export default PostDetailForm;