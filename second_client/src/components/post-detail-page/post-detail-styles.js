import styled from 'styled-components'

export const PostDetailContainer = styled.div`
    width: 100%;
    height: 100%;
`
export const PostDetailsWrapper  = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 2rem;
`

export const PostDetailLeftSide = styled.div`
    width: 35rem;
    height: 45rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

export const PostDetailRightSide = styled.div`
    width: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    margin-top: 8.5rem;
`

export const PageTitle = styled.div`
    padding-left: 1rem;
    font-size: 1.75rem;
    font-weight: bold;
`

export const TitleInputForm = styled.form`
    padding-left: 1rem;
    margin-top: 1.5rem;
    width: 20rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const TextInputContainer = styled.div`
    padding-left: 1rem;
    width: 40rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const TextInputArea = styled.textarea`
    width: 35rem;
    height: 25rem;
    resize: none;
`

export const PostActionButton = styled.button`
    width: 12rem;
    height: 2.75rem;
`