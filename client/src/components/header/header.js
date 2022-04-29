import { HeaderContainer, HeaderItem,  HeaderButtonContainer } from "./header_styles";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const Header = (props) => {
    useEffect(() => {
        if(props.user) {
            console.log('exists')
        }
    }, [])

    const headerButtonDisplay = () => {
        if(props.user) {
            return  <HeaderButtonContainer>
                        <HeaderItem>Signed In</HeaderItem>
                    </HeaderButtonContainer>
        }
        return  <HeaderButtonContainer>
                     <Link to={`/sign-in`} style={{ textDecoration: 'none' }}><HeaderItem>Sign In</HeaderItem></Link>
                    <Link to={'/sign-up'} style={{ textDecoration: 'none' }}><HeaderItem>Sign Up</HeaderItem></Link>
                </HeaderButtonContainer>
    }

    return(
        <HeaderContainer>
            <Link to="/" style={{ textDecoration: 'none' }}><HeaderItem primary>Blog API</HeaderItem></Link>
           {headerButtonDisplay()}
        </HeaderContainer>
    )
}

export default Header;