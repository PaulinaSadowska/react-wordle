import React from "react";
import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";

interface GameState {
    currentRow: number,
    currentTile: number,
    message: String,
    guessRows: String[][]
}

export default class Game extends React.Component {

    state: GameState = {
        currentRow: 0,
        currentTile: 0,
        message: "",
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
                <Message message={this.state.message} />
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
        if (text === '«') {
            this.deleteLetter();
        }
        else if (text === 'ENTER') {
            this.checkRow();
        }
        else if (this.state.currentTile < 5) {
            this.addLetter(text);
        }
    }

    private addLetter(text: String) {
        let newRows = this.state.guessRows.slice();
        newRows[this.state.currentRow][this.state.currentTile] = text;
        this.setState({
            currentTile: this.state.currentTile + 1,
            guessRows: newRows
        });
    }

    private checkRow() {
        if (this.state.currentTile === 5) {
            const guess = this.state.guessRows[this.state.currentRow].join('')
            console.log(`guess is ${guess}`);
            this.setState({
                currentTile: 0,
                currentRow: this.state.currentRow + 1,
                message: `guess is ${guess}`
            });
        }
    }

    private deleteLetter() {
        if (this.state.currentTile > 0) {
            let newRows = this.state.guessRows.slice();
            newRows[this.state.currentRow][this.state.currentTile - 1] = '';
            this.setState({
                currentTile: this.state.currentTile - 1,
                guessRows: newRows
            });
        }
    }
}