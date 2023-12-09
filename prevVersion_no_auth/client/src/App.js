import HomePage from './components/HomePage';
import Card from "./components/Card";
import Quiz from './components/QuizMode';
import Study from './components/StudyMode';


import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:id' element={<Card />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/study' element={<Study />} />
      </Routes>
    </div>
  );
}

export default App;
