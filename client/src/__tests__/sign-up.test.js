import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import SignUpPage from "../components/sign-up/sign_up";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import TestContext from "../components/context";

const userInfoMock = jest.fn();
const authTokenMock = jest.fn();

describe("sign up page", () => {
  it("renders without errors", () => {
    render(
      <BrowserRouter>
        <TestContext.Provider
          value={{
            userInfo: [{}, userInfoMock],
            authToken: ["", authTokenMock],
          }}>
          <SignUpPage />
        </TestContext.Provider>
      </BrowserRouter>
    );
  });

  it("succesfully calls postSignUp on button click", () => {
    render(
      <BrowserRouter>
        <TestContext.Provider
          value={{
            userInfo: [{}, userInfoMock],
            authToken: ["", authTokenMock],
          }}
        >
          <SignUpPage />
        </TestContext.Provider>
      </BrowserRouter>
    );
    expect(screen.findByText("Submitting..."));
  });

  it("succesfully handles user input", () => {
    render(
      <BrowserRouter>
        <TestContext.Provider
          value={{
            userInfo: [{}, userInfoMock],
            authToken: ["", authTokenMock],
          }}
        >
          <SignUpPage />
        </TestContext.Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Submit" });
    const usernameInput = screen.getByPlaceholderText("E-mail");
    const displayNameInput = screen.getByPlaceholderText("Display Name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");

    userEvent.type(usernameInput, "test@gmail.com");
    userEvent.type(passwordInput, "test");
    userEvent.type(displayNameInput, "Test User");
    userEvent.type(confirmPasswordInput, "test");
    userEvent.click(button);

    expect(usernameInput.value).toBe("test@gmail.com");
    expect(passwordInput.value).toBe("test");
    expect(displayNameInput.value).toBe("Test User");
    expect(confirmPasswordInput.value).toBe("test");
  });

});
