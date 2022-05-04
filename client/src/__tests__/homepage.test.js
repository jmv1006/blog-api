import React from 'react';
import { screen, render } from '@testing-library/react'
import HomePage from '../components/homepage/home_page';
import PostsContainer from '../components/homepage/posts/postsContainer';
import { BrowserRouter } from 'react-router-dom';

const mockedPosts = [{
    title: "Test Title",
    author: {
        displayName: "Test User"
    }
}];

describe("home page", () => {
    it("renders without error", () => {
        const container = render(<BrowserRouter><HomePage /></BrowserRouter>)
        expect(container)
    });

    it("renders posts on page", () => {
        render(<BrowserRouter><PostsContainer posts={mockedPosts} isLoading={false} /></BrowserRouter>)
        expect(screen.getByText("Test Title"))
    })

    it("renders loading if posts are being fetched", () => {
        render(<BrowserRouter><PostsContainer posts={[]} isLoading={true} /></BrowserRouter>)
        expect(screen.getByText("Loading..."))
    })

    it("renders an error if posts can not be posted from server", () => {
        render(<BrowserRouter><PostsContainer posts={[]} error={true} /></BrowserRouter>)
        expect(screen.getByText("Server Error"))
    })
})
