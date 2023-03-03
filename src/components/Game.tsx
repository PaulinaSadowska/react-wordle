import React from "react";
import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";

const guessRows : String[][] = [
    ['A', 'P', 'P', 'L', 'E'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

export default class Game extends React.Component {


    render() {
      return (
        <div className="game-container">
        <header className="title-container">
          <h1>Wordle</h1>  
        </header>
        <div className="message-container">
          
        </div>
        <GuessRows
            rows={guessRows}
        />
        <Keyboard
          onKeyClicked={ (text: String) => console.log(text)}
        />
      </div>
      );
    }
  }