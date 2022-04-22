import styled from "styled-components";

export const IndividualCommentCont = styled.div`
    border: 1px solid black;
    width: 95%;
    min-height: 3rem;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: .25rem;
`

export const CommentAuthor = styled.div`
    font-size: 1.05rem;
    font-weight: bold;
`

export const CommentText = styled.div`
    width: 95%
`