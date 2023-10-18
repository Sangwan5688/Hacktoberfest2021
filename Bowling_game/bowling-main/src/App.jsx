import './App.css'
// import { NewPlayerForm } from "./components/NewPlayerForm.jsx";
// import { PlayersList } from './components/PlayersList.jsx';
// import {useSelector} from "react-redux";
import { Welcome } from "./components/Welcome.jsx";
import { GameMode } from "./components/GameMode.jsx";
import {Routes, Route, Link, NavLink, useLocation} from 'react-router-dom';

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/game-mode" element={<GameMode />} />
        </Routes>
    </>
  )
}

export default App
