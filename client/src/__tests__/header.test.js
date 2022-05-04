import React from 'react';
import { screen, render, getByRole } from '@testing-library/react'
import Header from '../components/header/header';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';

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