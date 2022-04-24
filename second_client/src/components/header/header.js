import { Link } from "react-router-dom";
import { HeaderContainer } from "./header-styles";

const Header = (props) => {

    const handleIfSignedIn = () => {
        if(props.user) {
            return <div>Signed In</div>
        }
        return <Link to='/sign-in'>Sign In</Link>
    }

    return(
        <HeaderContainer>
            Blog Editor
            <div>{handleIfSignedIn()}</div>
        </HeaderContainer>
    )
};

export default Header;