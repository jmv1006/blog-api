import React from "react";
import { screen, render } from '@testing-library/react';
import HomePage from "./homepage";
import { BrowserRouter } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';

const mockUser = {};
const mockToken = "";
const mockSetUser = jest.fn();
const mockSetToken = jest.fn();

describe("home page", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [mockUser, mockSetUser], authToken: [mockToken, mockSetToken]}}>
                <HomePage />
            </AuthContext.Provider>
            </BrowserRouter>
        )
    });

    it("renders sign in to access when user is not logged in", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [null, mockSetUser], authToken: [null, mockSetToken]}}>
                <HomePage />
            </AuthContext.Provider>
            </BrowserRouter>
        )
        expect(screen.getByText("Sign In To Access"))
    });

    it("fetches posts when signed in", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [mockUser, mockSetUser], authToken: [mockToken, mockSetToken]}}>
                <HomePage />
            </AuthContext.Provider>
            </BrowserRouter>
        )
        expect(screen.getByText("Loading Posts..."))
    });

});