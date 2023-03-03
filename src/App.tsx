import React from 'react';
import './App.css';
import Keyboard from './components/Keyboard';

function App() {
  return (
    <div className="game-container">
      <header className="title-container">
        <h1>Wordle</h1>  
      </header>
      <div className="message-container">
        
        </div>
      <div className="tile-container">

      </div>
      <Keyboard
        onKeyClicked={ (text: String) => console.log(text)}
      />
    </div>
  );
}

export default App;
