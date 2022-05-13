import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignInFormContainer,
  SignInForm,
  SignInTitle,
  SignInInputBox,
  SignInFormButton,
} from "./sign_in_styles";
import AuthContext from "../../contexts/context";
import useAuth from "../../hooks/useAuth";

const SignInPage = () => {
  const Navigate = useNavigate();
  const { userInfo, authToken } = useContext(AuthContext);

  const [user, createUser] = userInfo;
  const [token, setToken] = authToken;

  const { isLoading, error, returnedUser, signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("Sign In");

  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  useEffect(() => {
    if (returnedUser) {
      console.log(returnedUser)
      setSignInMessage("Success");
      createUser(returnedUser.user);
      setToken(returnedUser.token);
      Navigate("/");
    }
  }, [returnedUser]);

  useEffect(() => {
    if (error) {
      setSignInMessage("Sign In");
    }
  }, [error]);

  const handleSignIn = (e) => {
    e.preventDefault();
    const body = {
      username: username,
      password: password,
    };
    setSignInMessage("Signing In...");
    signIn(body);
  };

  return (
    <SignInFormContainer>
      <SignInTitle>Sign In Here</SignInTitle>
      <SignInForm onSubmit={handleSignIn}>
        <SignInInputBox
          type="email"
          placeholder="email"
          name="username"
          onChange={handleChange}
          value={username}
          required
        ></SignInInputBox>
        <SignInInputBox
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        ></SignInInputBox>
        {error && error.status === 500 ? "Server Error" : null}
        {error && error.status === 400
          ? "Incorrect Username or Password"
          : null}
        <SignInFormButton type="submit">{signInMessage}</SignInFormButton>
      </SignInForm>
    </SignInFormContainer>
  );
};

export default SignInPage;
