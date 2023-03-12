import React from "react";
import { checkWord, getRandomWord } from "../wordsRepository";
import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";

interface GameState {
    currentRow: number,
    currentTile: number,
    message: string,
    isGameOver: boolean,
    word: string,
    guessRows: string[][],
    tileStates: TileState[][]
    keys: KeyData[]
}

export interface KeyData {
    key: string,
    keyState: KeyState
}

export const enum TileState {
    Grey,
    Green,
    Yellow,
    Inactive
}


export const enum KeyState {
    Grey,
    Green,
    Yellow
}

const allKeys: string[] = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

export default class Game extends React.Component {

    state: GameState = {
        currentRow: 0,
        currentTile: 0,
        message: "",
        isGameOver: false,
        word: "OFFER",
        guessRows: this.initializeBoardWith(""),
        tileStates: this.initializeBoardWith(TileState.Inactive),
        keys: allKeys.map((text) => { return { key: text, keyState: KeyState.Grey } })
    };

    private initializeBoardWith(data: any): any[][] {
        return Array.from(Array(6)).map(() => { return Array.from(Array(5)).map(() => { return data; }); });
    }

    componentDidMount() {
        console.log(this.state)
        getRandomWord().then((word) => {
            this.setState({
                word: word
            })
        })
    }

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
                    keys={this.state.keys}
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

            checkWord(guess).then((result) => {
                if (result === true) {
                    this.setState({
                        currentTile: 0,
                        currentRow: this.state.currentRow + 1,
                        message: (this.state.currentRow === 5) ? "Game Over" : `guess is ${guess}`,
                        isGameOver: this.state.currentRow === 5,
                    });
                    this.modifyTileState()
                    setTimeout(() => this.setState({ message: "" }), 3000)
                } else {
                    this.setState({
                        message: "Incorrect word",
                    });
                    setTimeout(() => this.setState({ message: "" }), 3000)
                }
            })
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