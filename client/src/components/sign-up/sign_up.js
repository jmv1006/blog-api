import {
  SignUpPageContainer,
  SignUpForm,
  SignUpInputBox,
} from "./sign_up_styles";
import { StyledButton } from '../global-styles';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignUpPage = () => {
  const Navigate = useNavigate();

  const { error, signUp, isDone } = useAuth();

  const [formInfo, setFormInfo] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmedPassword: "",
  });

  const [submitMessage, setSubmitMessage] = useState("Submit");

  useEffect(() => {
    if(isDone && !error) {
      setSubmitMessage("Successful")
      Navigate('/sign-in')
    }
  }, [isDone])

  useEffect(() => {
    if(error) {
      //error exists
    }
  }, [error])

  const handleChange = (e) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault()
    setSubmitMessage("Submitting...")
    signUp(formInfo);
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
        {error ? "Error Signing Up" : null}
        <StyledButton onClick={handleSignUp}>
          {submitMessage}
        </StyledButton>
      </SignUpForm>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
