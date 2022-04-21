//import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header'
import './app.css'

function App() {

  return (
    <div className='appContainer'>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;