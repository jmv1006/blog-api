import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomePage from './components/homepage/homepage';
import PostDetailPage from './components/post-detail-page/post-detail';
import CreatePost from './components/create-post/create-post';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignInPage from './components/sign-in/sign-in';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<HomePage />} />
          <Route path='/manage/post/:postId' element={<PostDetailPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/create-post' element={<CreatePost />} />
      </Route>
    </Routes>
  </BrowserRouter>
);