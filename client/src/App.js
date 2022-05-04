import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./app.css";
import { useState } from "react";
import AuthContext from "./components/context";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  return (
    <div className="appContainer">
      <Header user={user} />
      <AuthContext.Provider
        value={{ userInfo: [user, setUser], authToken: [token, setToken] }}
      >
        <Outlet />
      </AuthContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
