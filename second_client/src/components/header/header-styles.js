import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #282828;
`

export const HeaderItem = styled.div`
    color: white;
    font-size: ${props => props.primary ? "1.5rem" : "1.1rem"}
`
