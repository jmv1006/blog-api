import styled from "styled-components";

export const WelcomeContainer = styled.div`
    width: 100%;
    height: 25rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #282828;
    color: white;
`   
export const WelcomeTextContainer = styled.div`
    width: 25rem;
    height: 15rem;
`
export const WelcomeTitle = styled.div`
    font-size: 1.6rem;
    font-weight: bold;
    @media (max-width: 850px) {
        text-align: center;
    }
`
export const WelcomeText = styled.div`
    height: 12rem;
`

export const ImageContainer = styled.div`
    @media (max-width: 850px) {
        display: none;
    }
`

export const Image = styled.img`
    width: 25rem;
    border-radius: 1rem;
`