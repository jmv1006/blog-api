import {
  SignUpPageContainer,
  SignUpForm,
  SignUpInputBox,
  SignUpFormButton,
} from "./sign_up_styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const Navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmedPassword: "",
  });

  const [error, setError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("Submit");

  const handleChange = (e) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault()
    fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
    .then(res => {
      if(!res.ok) {
        throw new Error()
      }
      res.json()
    })
    .then(res => {
      setSubmitMessage("Submit")
      Navigate('/sign-in')
    })
    .catch(error => {
      setError(true)
    }) 
  }

  return (
    <SignUpPageContainer>
      <SignUpForm>
        <h2>Sign Up</h2>
        <SignUpInputBox
          type="text"
          placeholder="E-mail"
          name="username"
          value={formInfo.username}
          onChange={handleChange}
          required
        ></SignUpInputBox>
        <SignUpInputBox
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={formInfo.displayName}
          onChange={handleChange}
          required
        ></SignUpInputBox>
        <SignUpInputBox
          type="password"
          placeholder="Password"
          name="password"
          value={formInfo.password}
          onChange={handleChange}
          required
        ></SignUpInputBox>
        <SignUpInputBox
          type="password"
          placeholder="Confirm Password"
          name="confirmedPassword"
          value={formInfo.confirmedPassword}
          onChange={handleChange}
          required
        ></SignUpInputBox>
        <SignUpFormButton onClick={handleSignUp}>
          {submitMessage}
        </SignUpFormButton>
        {error ? "Error Signing Up" : null}
      </SignUpForm>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
