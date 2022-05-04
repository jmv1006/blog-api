import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import TestContext from '../components/context';
import CommentsComponent from '../components/postpage/comments/comments-container';

const userInfoMock = jest.fn();
const authTokenMock = jest.fn();

describe("Comments Container", () => {
    it("renders without error", () => {
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={false}/>
                </TestContext.Provider>
            </BrowserRouter>
        )
    });

    it("tells user to sign in to post comments", () => {
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={false}/>
                </TestContext.Provider>
            </BrowserRouter>
        )

        expect(screen.getByText("Sign In To Post Comments"))
    })

    it("allows signed in user to create a comment", () => {
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={true}/>
                </TestContext.Provider>
            </BrowserRouter>
        )
        expect(screen.getByText("Create Comment"))
    })

    it("calls createComment method on button click", () => {
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={true}/>
                </TestContext.Provider>
            </BrowserRouter>
        )
        
        const button = screen.getByRole("button", {name: "Submit"})
        userEvent.click(button)
        expect(screen.getByText("Submitting..."))
    })

    it("displays correct message when no comments are available", () => {
        const fakeMessages = [];
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={null} comments={null}/>
                </TestContext.Provider>
            </BrowserRouter>
        )
        expect(screen.findByText("No Comments"))
    })

    it("displays comments", () => {
        const fakeMessages = [{text: "TEST TEXT", author: {displayName: "Test user"}}];
        render(
            <BrowserRouter>
                <TestContext.Provider value={{userInfo: [{}, userInfoMock], authToken: ["", authTokenMock]}}>
                    <CommentsComponent user={true} comments={fakeMessages}/>
                </TestContext.Provider>
            </BrowserRouter>
        )
        expect(screen.findByText("TEST TEXT"))
    })


});