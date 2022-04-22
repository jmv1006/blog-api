import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    min-height: 4.25rem;
    background-color: lightgrey;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: sticky;
`;

export const HeaderItem = styled.div`
    width: 6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
    ${props => props.primary 
        ? 'font-size: 1.5rem'
        : '&:hover { cursor: pointer }'
    }
`;

export const HeaderButtonContainer = styled.div`
    width: 15rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`