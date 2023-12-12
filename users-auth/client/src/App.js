import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginRegister from "./components/LoginRegister";
import Info from "./components/Info";
import Nav from "./components/Nav";
import Auth from "./auth/Auth";
import "./App.css";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState();
  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' element={<Auth><Home /></Auth>} />
          <Route path='/login' element={<LoginRegister title='Login' />} />
          <Route
            path='/register'
            element={<LoginRegister title='Register' />}
          />
          <Route path='/secure' element={<Auth><Info /></Auth>} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
