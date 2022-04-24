import { useEffect } from "react";
import Header from './components/header/header';
import './app.css'
import { Outlet } from "react-router-dom";

function App() {

  /*
  useEffect(() => {
    fetch('/posts')
    .then(res => res.text())
    .then(res => console.log(res))
  }, [])
  */

  return (
    <div className="mainAppContainer">
      <Header />
      {/* Outlet */}
      <Outlet />
      {/* Footer */}
    </div>
  );
}

export default App;