import styled from "styled-components";

export const CommentsContainer = styled.div`
    border: 1px solid black;
    padding: 1rem;
    width: 50rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    gap: .5rem;
    margin-bottom: 2rem;
    overflow: auto;
`

export const SingleCommentContainer = styled.div`
    border: 1px solid black;
    min-height: 3.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
`

export const CommentAuthorAndDelete = styled.div`
    padding: .25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
`