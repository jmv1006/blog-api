import { HeaderContainer, HeaderItem } from "./header_styles";
import { Link } from 'react-router-dom';

const Header = () => {
    
    return(
        <HeaderContainer>
            <HeaderItem primary>Blog API</HeaderItem>
            <Link to={`/sign-in`}><HeaderItem>Sign In</HeaderItem></Link>
        </HeaderContainer>
    )
}

export default Header;