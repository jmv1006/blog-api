import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    min-height: 4.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #282828;
    position: sticky; top: 0;
`;

export const HeaderItem = styled.div`
    width: 6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    ${props => props.primary 
        ? 'font-size: 1.5rem; margin-left: 2rem;'
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