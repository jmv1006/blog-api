import React from "react";
import { render, screen } from "@testing-library/react";
import ActionButtons from "../action-buttons/action-buttons";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";

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