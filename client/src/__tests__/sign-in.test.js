import React from "react";
import { screen, render, getByRole } from "@testing-library/react";
import SignInPage from "../components/sign-in/sign_in";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import TestContext from "../components/context";

const userInfoMock = jest.fn();
const authTokenMock = jest.fn();

describe("Sign In Page", () => {
  it("renders without error", () => {
    render(
      <BrowserRouter>
        <TestContext.Provider
          value={{
            userInfo: [{}, userInfoMock],
            authToken: ["", authTokenMock],
          }}
        >
          <SignInPage />
        </TestContext.Provider>
      </BrowserRouter>
    );
  });

  it("successfully calls handleSignIn method on button push", async () => {
    render(
      <BrowserRouter>
        <TestContext.Provider
          value={{
            userInfo: [{}, userInfoMock],
            authToken: ["", authTokenMock],
          }}
        >
          <SignInPage />
        </TestContext.Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Sign In" });
    userEvent.click(button);

    expect(screen.findByText("Signing In..."))
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
          <SignInPage />
        </TestContext.Provider>
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: "Sign In" });
    const usernameInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");

    userEvent.type(usernameInput, "test@gmail.com");
    userEvent.type(passwordInput, "test");
    userEvent.click(button);

    expect(usernameInput.value).toBe("test@gmail.com")
    expect(passwordInput.value).toBe("test")
  })

});
