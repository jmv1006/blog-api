import styled from "styled-components";

export const PostPage = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 1rem;
`

export const PostContentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.25rem;
`
export const TopContainer = styled.div`
    width: 88%;
    padding: 1%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: .5rem;
`

export const AuthorTitleContainer = styled.div`
    width: 26rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 1rem;
`

export const TitleContainer = styled.div`
    width: 40rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
`

export const PostImageContainer = styled.div`
    border: 2px solid black;
    width: 98%;
    height: 30rem;
  
`

export const TextContainer = styled.div`
    width: 88%;
    min-height: 20rem;
`

export const CommentContainer = styled.div`
    width: 88%;
    min-height: 20rem;
    padding: 1%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
`

export const CreateCommentContainer = styled.div`
    width: 96.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
export const CreateCommentForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: .5rem;
`
export const CommentInputBox = styled.textarea`
    resize: none;
    width: 100%;
    height: 4rem;
    font-family: 'Source Sans Pro', sans-serif;
`