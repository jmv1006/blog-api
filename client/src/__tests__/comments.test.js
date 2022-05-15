import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CommentsComponent from "../components/postpage/comments/comments-container";

const userInfoMock = jest.fn();
const authTokenMock = jest.fn();

describe("Comments Container", () => {
  it("renders without error", () => {
    render(
      <BrowserRouter>
        <CommentsComponent user={false} comments={[]} />
      </BrowserRouter>
    );
  });

  it("tells user to sign in to post comments", () => {
    render(
      <BrowserRouter>
        <CommentsComponent user={false} comments={[]} />
      </BrowserRouter>
    );
    expect(screen.getByText("Sign In"));
  });

  it("allows signed in user to create a comment", () => {
    render(
      <BrowserRouter>
        <CommentsComponent user={true} comments={[]} />
      </BrowserRouter>
    );
    expect(screen.getByText("Create Comment"));
  });

  it("displays correct message when post has no comments", () => {
    const fakeMessages = [];
    const mockComment = {
      text: "Test Comment",
      author: {
        displayName: "Test user",
      },
    };

    render(
      <BrowserRouter>
        <CommentsComponent user={null} comments={[mockComment]} />
      </BrowserRouter>
    );
    expect(screen.getByText("Test Comment"));
  });
});