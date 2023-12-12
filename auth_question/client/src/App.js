import './App.css';

import { Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import HomePage from './components/HomePage';
import HomePage2 from './components/HomePage2';

// no auth
import Card from "./components/Card";
import Quiz from './components/QuizMode';
import Study from './components/StudyMode';
// no auth

import Auth from "./auth/Auth";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState();
  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<HomePage />} /> */}
          <Route path='/' element={<Auth><HomePage /></Auth>} />
          <Route path='/login' element={<LoginRegister title='Login' />} />
          <Route path='/register' element={<LoginRegister title='Register' />} />
          {/* <Route path='/homepage2' element={<Auth><HomePage2 /></Auth>} /> */}
          <Route path='/homepage2' element={<HomePage2 />} />

          <Route path='/quiz' element={<Quiz />} />
          <Route path='/study' element={<Study />} />
          <Route path='/:id' element={<Card />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

