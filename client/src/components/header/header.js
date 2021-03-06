import {
  HeaderContainer,
  HeaderItem,
  HeaderButtonContainer,
} from "./header_styles";
import { Link } from "react-router-dom";

const Header = (props) => {
  const headerButtonDisplay = () => {
    if (props.user) {
      return (
        <HeaderButtonContainer>
          <HeaderItem>Signed In</HeaderItem>
        </HeaderButtonContainer>
      );
    }
    return (
      <HeaderButtonContainer>
        <Link to={`/sign-in`} style={{ textDecoration: "none" }}>
          <HeaderItem>Sign In</HeaderItem>
        </Link>
        <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
          <HeaderItem>Sign Up</HeaderItem>
        </Link>
      </HeaderButtonContainer>
    );
  };

  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: "none" }}>
        <HeaderItem primary>BlogIt</HeaderItem>
      </Link>
      {headerButtonDisplay()}
    </HeaderContainer>
  );
};

export default Header;
