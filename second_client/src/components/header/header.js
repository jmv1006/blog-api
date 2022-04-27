import { Link } from "react-router-dom";
import { HeaderContainer } from "./header-styles";

const Header = (props) => {

    const handleIfSignedIn = () => {
        if(props.user) {
            return <div>
                <Link to="/create-post">Create Post</Link>
            </div>
        }
        return <Link to='/sign-in'>Sign In</Link>
    }

    return(
        <HeaderContainer>
            <Link to="/">Blog Editor</Link>
            <div>{handleIfSignedIn()}</div>
        </HeaderContainer>
    )
};

export default Header;