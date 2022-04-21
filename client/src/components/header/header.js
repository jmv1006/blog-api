import { HeaderContainer, HeaderItem } from "./header_styles";
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
            return <HeaderItem>Signed In</HeaderItem>
        }
        return  <Link to={`/sign-in`}><HeaderItem>Sign In</HeaderItem></Link>
    }

    return(
        <HeaderContainer>
            <HeaderItem primary>Blog API</HeaderItem>
            {headerButtonDisplay()}
        </HeaderContainer>
    )
}

export default Header;