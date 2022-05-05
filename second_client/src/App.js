import { useEffect, useState } from "react";
import Header from './components/header/header';
import './app.css'
import { Outlet } from "react-router-dom";
import AuthContext from './contexts/AuthContext';

function App() {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

  return (
    <div className="mainAppContainer">
      <Header user={user}/>
      <AuthContext.Provider value={{userInfo: [user, setUser], authToken: [token, setToken]}}>
        <Outlet />
      </AuthContext.Provider>
      {/* Footer */}
    </div>
  );
}

export default App;