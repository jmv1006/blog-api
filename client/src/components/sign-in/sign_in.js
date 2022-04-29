import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SignInFormContainer, SignInForm, SignInTitle, SignInInputBox, SignInFormButton } from "./sign_in_styles";
import useFetchPost from "../../hooks/useFetchPost";

const SignInPage = () => {
  const Navigate = useNavigate();

  const { userInfo, authToken } = useOutletContext();

  const { returnedData, postData, postIsLoading, postError } = useFetchPost();

  const [user, setUser] = userInfo;
  const [token, setToken] = authToken;
  const [errors, setErrors] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInMessage, setSignInMessage] = useState("Sign In")

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
    
  }, [postIsLoading])

  useEffect(() => {

    if(returnedData && !postError) {
      setUser(returnedData.user)
      setToken(returnedData.token)
      Navigate('/')
    }

    //Error with post
    if(returnedData && postError) {
      setErrors(returnedData.info.message)
    };

  }, [returnedData])

  const postDatas = (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password
    }

    postData('/auth/sign-in', body, null)
    /*
    e.preventDefault();
    setSignInMessage("Signing In...")
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
          setUser(res.user);
          setToken(res.token);
          setSignInMessage("Sign In Successful")
        });
        return Navigate("/");
      }
      if(res.status === 500) {
          setErrors("Error Connecting To Server")
          return
      }
      return res.json().then((res) => {
        setSignInMessage("Sign In")
        setErrors(res.info.message);
      });
    });
    */
  };

  return (
    <SignInFormContainer>
      <SignInTitle>Sign In</SignInTitle>
      <SignInForm onSubmit={postDatas}>
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
        <SignInFormButton type="submit">Sign In</SignInFormButton>
      </SignInForm>
    </SignInFormContainer>
  );
};

export default SignInPage;
