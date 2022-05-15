import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App';
import PostPageContainer from './components/postpage/post_page';
import HomePage from './components/homepage/home_page';
import SignInPage from './components/sign-in/sign_in';
import SignUpPage from './components/sign-up/sign_up';
import Error from './components/error/error';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/post/:postId' element={<PostPageContainer />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
