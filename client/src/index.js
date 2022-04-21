import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from './App';
import PostPage from './components/post_page';
import HomePage from './components/home_page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts/:postId' element={<PostPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
