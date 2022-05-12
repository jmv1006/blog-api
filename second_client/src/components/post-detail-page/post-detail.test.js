import React from "react";
import { screen, render } from '@testing-library/react';
import PostDetailPage from "./post-detail";
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
                <PostDetailPage />
            </AuthContext.Provider>
            </BrowserRouter>
        )
    });

    it("fetches post on mount", () => {
        render(
            <BrowserRouter>
            <AuthContext.Provider value={{userInfo: [mockUser, mockSetUser], authToken: [mockToken, mockSetToken]}}>
                <PostDetailPage />
            </AuthContext.Provider>
            </BrowserRouter>
        )
        screen.getByText("Loading Post Info...")
    });

});