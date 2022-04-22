import { HeaderContainer, HeaderItem,  HeaderButtonContainer } from "./header_styles";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

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
                     <Link to={`/sign-in`}><HeaderItem>Sign In</HeaderItem></Link>
                    <Link to={'/sign-up'}><HeaderItem>Sign Up</HeaderItem></Link>
                </HeaderButtonContainer>
    }

    return(
        <HeaderContainer>
            <Link to="/"><HeaderItem primary>Blog API</HeaderItem></Link>
           {headerButtonDisplay()}
        </HeaderContainer>
    )
}

export default Header;