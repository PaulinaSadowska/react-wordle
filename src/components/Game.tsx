import React from "react";
import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";

interface GameState {
    currentRow: number,
    currentTile: number,
    message: string,
    isGameOver: Boolean,
    word: string,
    guessRows: string[][],
    tileStates: TileState[][]
}

export const enum TileState {
    Grey,
    Green,
    Yellow,
    Inactive
}

export default class Game extends React.Component {

    state: GameState = {
        currentRow: 0,
        currentTile: 0,
        message: "",
        isGameOver: false,
        word: "OFFER",
        guessRows: [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        tileStates: [
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
            [TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive, TileState.Inactive],
        ],
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
                    tileStates={this.state.tileStates}
                />
                <Keyboard
                    onKeyClicked={(text: string) => {
                        this.onKeyClicked(text);
                    }}
                />
            </div>
        );
    }

    private onKeyClicked(text: string) {
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

    private addLetter(text: string) {
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

            this.modifyTileState()

            console.log(this.state)
            this.setState({
                currentTile: 0,
                currentRow: this.state.currentRow + 1,
                message: (this.state.currentRow === 5) ? "Game Over" : `guess is ${guess}`,
                isGameOver: this.state.currentRow === 5,
            });
            setTimeout(() => this.setState({ message: "" }), 3000)
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

    private modifyTileState() {
        const guessRow = this.state.guessRows[this.state.currentRow]
        const wordle = this.state.word.split("")

        const newState = guessRow.map((guessedChar, index) => {
            return (guessedChar === wordle[index])
                ? TileState.Green
                : (wordle.includes(guessedChar))
                    ? TileState.Yellow
                    : TileState.Grey
        })

        newState.forEach((state, index) => {
            setTimeout(() => {
                const tileStates = this.state.tileStates.slice();
                tileStates[this.state.currentRow - 1][index] = state
                this.setState({
                    tileStates: tileStates
                })
            }, 500 * index)
        })


    }
}