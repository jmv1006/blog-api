import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    height: 5rem;
    background-color: wheat;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const HeaderItem = styled.div`
    border: 2px solid red;
    width: 6rem;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
    ${props => props.primary 
        ? 'font-size: 1.5rem'
        : '&:hover { cursor: pointer }'
    }
`;