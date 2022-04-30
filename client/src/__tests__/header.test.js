import React from 'react';
import { screen, render, getByRole } from '@testing-library/react'
import Header from '../components/header/header'
import userEvent from "@testing-library/user-event"
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
    })

    it("renders signed in if user exists", () => {
        render(<BrowserRouter><Header user={mockUser}/></BrowserRouter>)
        expect(screen.getByText("Signed In"))
    })

})

/*

const mockedPost = {
    title: "title",
    text: "text",
    isPublished: "true"
}

describe("post detail page", () => {
    it("opens up modal when delete button is clicked", () => {
       render(<BrowserRouter><ActionButtons post={mockedPost} /></BrowserRouter>);
       const deleteButton = screen.getByRole("button", {name: "Delete"});
       userEvent.click(deleteButton);
       expect(screen.getByText(/Are you sure you want to delete this post?/i))
    })
})

*/