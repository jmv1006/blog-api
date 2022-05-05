import React from "react";
import { screen, render } from '@testing-library/react';
import ActionButtons from "./action-buttons";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";

const mockUser = {};
const mockToken = "";
const mockSetUser = jest.fn();
const mockSetToken = jest.fn();
const mockPostPublished = {
    isPublished: true
}

describe("action buttons component", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [mockUser, mockSetUser], authToken: [mockToken, mockSetToken]}}>
                <ActionButtons post={mockPostPublished}/>
            </AuthContext.Provider>
            </BrowserRouter>
        )
    });

    it("renders unpublish if post is published", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [mockUser, mockSetUser], authToken: [mockToken, mockSetToken]}}>
                <ActionButtons post={mockPostPublished}/>
            </AuthContext.Provider>
            </BrowserRouter>
        )
        screen.getByText("Unpublish")
    })

});