import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  SignInFormContainer,
  SignInForm,
  SignInTitle,
  SignInInputBox,
  SignInFormButton,
} from "./sign_in_styles";
import AuthContext from "../context";

const SignInPage = () => {
  const Navigate = useNavigate();
  const { userInfo, authToken } = useContext(AuthContext);

  useEffect(() => {});
  const [user, createUser] = userInfo;
  const [token, setToken] = authToken;
  const [errors, setErrors] = useState("");

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

  const handleUserCreate = (user) => {
    createUser(user);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setSignInMessage("Signing In...");

    fetch("/auth/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          handleUserCreate(res.user);
          setToken(res.token);
          setSignInMessage("Sign In Successful");
          Navigate("/");
        });
      }
      if (res.status === 500) {
        setErrors("Error Connecting To Server");
        return;
      }
      return res.json().then((res) => {
        setSignInMessage("Sign In");
        setErrors(res.info.message);
      });
    });
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
        <SignInFormButton type="submit">{signInMessage}</SignInFormButton>
      </SignInForm>
      {errors}
    </SignInFormContainer>
  );
};

export default SignInPage;
