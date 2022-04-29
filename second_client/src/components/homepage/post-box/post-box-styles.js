import styled from "styled-components";

export const PostBoxContainer = styled.div`
    border: 1px solid black;
    border-radius: 1rem;
    width: 20rem;
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    color: black;
    &:hover {
        text-decoration: underline;
    }
`

export const PostBoxTitle = styled.div`
    font-size: 1.15rem;
    text-align: center;
    width: 90%;
    font-weight: bold;
`