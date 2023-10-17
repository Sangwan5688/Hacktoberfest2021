import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import GameScene from './Components/GameScene';
import React, { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = React.useState("player1")
  const [enemy, setEnemy] = React.useState("enemy")

  return (
    <div className="App">
      <main>
        <GameScene />
        <MoveSelection />
      </main>
      
    </div>
  );
}

export default App;
