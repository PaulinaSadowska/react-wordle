import React from "react";
import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";

interface GameState {
    currentRow: number,
    currentTile: number,
    guessRows: String[][]
}

export default class Game extends React.Component {

    state: GameState = {
        currentRow: 0,
        currentTile: 0,
        guessRows: [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ]
    };

    render() {
        return (
            <div className="game-container">
                <header className="title-container">
                    <h1>Wordle</h1>
                </header>
                <div className="message-container">

                </div>
                <GuessRows
                    rows={this.state.guessRows}
                />
                <Keyboard
                    onKeyClicked={(text: String) => {
                        this.onKeyClicked(text);
                    }}
                />
            </div>
        );
    }

    private onKeyClicked(text: String) {
        if(text === '«') {

            let newRows = this.state.guessRows.slice();
            if(this.state.currentTile > 0){
                newRows[this.state.currentRow][this.state.currentTile - 1] = '';
            }

            this.setState({
                currentTile: this.state.currentTile - 1,
                guessRows: newRows
            });
        }
        else if(text === 'ENTER') {
            console.log('check my guess!')
            if(this.state.currentRow < 5){
                this.setState({
                    currentTile: 0,
                    currentRow: this.state.currentRow + 1
                });
            } else {
                console.log('you lost!')
            }
        }
        else if (this.state.currentTile < 5) {
            let newRows = this.state.guessRows.slice();
            newRows[this.state.currentRow][this.state.currentTile] = text;
            this.setState({
                currentTile: this.state.currentTile + 1,
                guessRows: newRows
            });
        }
    }
}