import styled from 'styled-components'

export const PostDetailContainer = styled.div`
    width: 100%;
    height: 100%;
`
export const PostDetailsWrapper  = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
export const PostDetailTopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 2.5rem;
    gap: 2rem;
`
export const PostDetailLeftSide = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
`

export const PostDetailRightSide = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: space-around;
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
    gap: .5rem;
`

export const TextInputContainer = styled.div`
    padding-left: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SuccesfullySavedPopUp = styled.div`
    position: absolute;
    border: 2px solid red;
`