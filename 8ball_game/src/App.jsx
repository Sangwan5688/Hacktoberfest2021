import { useState } from 'react'
import './App.css'


import answers from './components/Answers'
import Button from './components/Button'
// On importe les différents composants afin de faire des liens entre eux.



function App() {

  return (

    <div className="App">
      <Button answers={answers} /> {/* On appelle le composant Button en lui passant le tableau "answer" en props */}
    </div>
  )
}

export default App
