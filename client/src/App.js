//import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header'
import './app.css'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  return (
    <div className='appContainer'>
      <Header user={user} />
      <Outlet context={{userInfo: [user, setUser], authToken: [token, setToken]}}/>
    </div>
  );
}

export default App;