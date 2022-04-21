import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header'
import './app.css'

function App() {

  /*
  const [posts, setPosts] = useState([])

  
  useEffect(() => {
    fetch('/posts')
    .then(res => res.json())
    .then(res => {
      processData(res)
    })
  }, [])

  const processData = (dataArr) => {
    setPosts(dataArr)
  }

  const mappedPosts = posts.map((post) => 
    <div key={post._id}>
      <div>Title: {post.title}</div>
      <div>Text: {post.text}</div>
      <div>Author: {post.author.displayName}</div>
    </div>
  )
  */
  return (
    <div className='appContainer'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;