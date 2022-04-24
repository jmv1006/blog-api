import { useEffect, useState } from "react";
import Header from './components/header/header';
import './app.css'
import { Outlet } from "react-router-dom";

function App() {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  return (
    <div className="mainAppContainer">
      <Header user={user}/>
      <Outlet context={{userInfo: [user, setUser], authToken: [token, setToken]}}/>
      {/* Footer */}
    </div>
  );
}

export default App;