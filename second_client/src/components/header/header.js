import { Link } from "react-router-dom";
import { HeaderContainer, HeaderItem } from "./header-styles";

const Header = (props) => {

    const handleIfSignedIn = () => {
        if(props.user) {
            return <Link to="/create-post" style={{ textDecoration: 'none' }}><HeaderItem>Create Post</HeaderItem></Link>
        }
        return <Link to='/sign-in' style={{ textDecoration: 'none' }}><HeaderItem>Sign In</HeaderItem></Link>
    }

    return(
        <HeaderContainer>
            <Link to="/" style={{ textDecoration: 'none' }}><HeaderItem primary>Blog Editor</HeaderItem></Link>
            <div>{handleIfSignedIn()}</div>
        </HeaderContainer>
    )
};

export default Header;