import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App';
import PostPage from './components/postpage/post_page';
import HomePage from './components/homepage/home_page';
import SignInPage from './components/sign-in/sign_in';
import SignUpPage from './components/sign-up/sign_up';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
