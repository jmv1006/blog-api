import React from 'react';
import { screen, render } from '@testing-library/react'
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe("App", () => {
    it("renders without error", () => {
        render(<BrowserRouter><App /></BrowserRouter>)
    });
})