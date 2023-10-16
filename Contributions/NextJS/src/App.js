import './App.css';
import React from 'react';

function App() {
  
    //<h1>JSX is Combination of HTML and JS</h1>
    const jsx=<h1>JsX is Combination of HTML and JS</h1>
    return React.createElement("h1",null,"JSX is Combination of HTML and JS")
  
}

export default App;
