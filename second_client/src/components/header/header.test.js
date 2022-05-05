import React from "react";
import { screen, render } from '@testing-library/react';
import Header from './header';
import { BrowserRouter } from "react-router-dom";

describe("header", () => {
    it("renders without error", () => {
        render(<BrowserRouter><Header /></BrowserRouter>)
    })

    it("renders sign in when no user is signed in", () => {
        render(<BrowserRouter><Header user={null}/></BrowserRouter>)
        expect(screen.getByText("Sign In"))
    })

    it("renders create post when user is signed in", () => {
        render(<BrowserRouter><Header user={true}/></BrowserRouter>)
        expect(screen.getByText("Create Post"))
    })
});