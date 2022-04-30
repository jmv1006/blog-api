import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SignInFormContainer, SignInForm, SignInTitle, SignInInputBox, SignInFormButton } from "./sign-in-styles";

const SignInPage = () => {
  const Navigate = useNavigate();

  const { userInfo, authToken } = useOutletContext();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;
  const [errors, setErrors] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("");

  useEffect(() => {
    if(user) {
      Navigate('/')
    }
    setSignInMessage("Sign In");
  }, [])

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

  const postData = (e) => {
    e.preventDefault();
    setSignInMessage("Signing In....")
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
          if (res.user.isAdmin) {
            setSignInMessage("Signing In Successful")
            setUser(res.user);
            setToken(res.token);
            Navigate("/");
            return;
          }
          setErrors("User is not an admin");
        });
      }
      if(res.status === 500) {
        setErrors("Error Connecting To Server")
        return
      }
      res.json().then(res => setErrors(res.info.message))
      setSignInMessage("Sign In")
    });
  };
  
  return (
    <SignInFormContainer>
      <SignInTitle>Sign In</SignInTitle>
      <SignInForm onSubmit={postData}>
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
        {errors}
        <SignInFormButton type="submit">{signInMessage}</SignInFormButton>
      </SignInForm>
    </SignInFormContainer>
  );
};

export default SignInPage;
