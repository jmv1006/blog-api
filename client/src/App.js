//import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header'
import './app.css'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState();
  
  return (
    <div className='appContainer'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;