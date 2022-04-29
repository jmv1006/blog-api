//import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header'
import Footer from './components/footer/footer';
import './app.css'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  //const data = useFetchGet('/posts')
  
  return (
    <div className='appContainer'>
      <Header user={user} />
      <Outlet context={{userInfo: [user, setUser], authToken: [token, setToken]}}/>
      <Footer />
    </div>
  );
}

export default App;