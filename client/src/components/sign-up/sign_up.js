import { SignUpPageContainer } from "./sign_up_styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const Navigate = useNavigate();

  const [formInfo, setFormInfo] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmedPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;

    setFormInfo({
      ...formInfo,
      [e.target.name]: value,
    });
  };

  const postSignUp = (e) => {
    e.preventDefault();

    fetch("/auth/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          Navigate("/sign-in");
        });
        return;
      }
      res.json().then((res) => {
        if (res.errors) {
          setErrors(res.errors);
          return;
        }
        const errArr = [];
        errArr.push(res);
        setErrors(errArr);
      });
    });
  };

  const mappedErrors = errors.map((error) => <div key={error}>{error}</div>);

  return (
    <SignUpPageContainer>
      <form onSubmit={postSignUp}>
        <input
          type="text"
          placeholder="E-mail"
          name="username"
          value={formInfo.username}
          onChange={handleChange}
          required
        ></input>
        <input
          type="text"
          placeholder="Display Name"
          name="displayName"
          value={formInfo.displayName}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formInfo.password}
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmedPassword"
          value={formInfo.confirmedPassword}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      {mappedErrors}
    </SignUpPageContainer>
  );
};

export default SignUpPage;
