import React from 'react';
import { screen, render } from '@testing-library/react'
import Header from '../components/header/header';
import { BrowserRouter } from "react-router-dom";

const mockUser = {
    name: "Mock user"
};

describe("header", () => {
    it("renders without error", () => {
        render(<BrowserRouter><Header /></BrowserRouter>)
    });

    it("renders sign up if user does not exist", () => {
        render(<BrowserRouter><Header user={null}/></BrowserRouter>)
        expect(screen.getByText("Sign Up"));
    });

    it("renders signed in if user exists", () => {
        render(<BrowserRouter><Header user={mockUser}/></BrowserRouter>)
        expect(screen.getByText("Signed In"))
    });
})