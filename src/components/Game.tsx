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
    keys: string[],
    keysState: KeyState[]
}

export const enum TileState {
    Grey,
    Green,
    Yellow,
    Inactive
}


export const enum KeyState {
    Grey,
    LightGrey,
    Green,
    Yellow,
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
        keys: allKeys,
        keysState: allKeys.map(() => { return KeyState.LightGrey })
    };

    private initializeBoardWith(data: any): any[][] {
        return Array.from(Array(6)).map(() => { return Array.from(Array(5)).map(() => { return data; }); });
    }

    componentDidMount() {
        getRandomWord().then((word) => {
            this.setState({
                word: word
            })
            console.log(word)
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
                    keysState={this.state.keysState}
                    onKeyClicked={(text: string) => {
                        this.onKeyClicked(text);
                    }}
                />
            </div>
        );
    }

    private onKeyClicked(text: string) {
        if (this.state.isGameOver === true) {
            return
        }
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

            if (guess === this.state.word) {
                this.setState({
                    currentRow: this.state.currentRow + 1,
                    message: "Congratulations!",
                    isGameOver: true,
                });
                this.modifyTileState()
            } else {
                checkWord(guess).then((result) => {
                    if (result === true) {
                        this.setState({
                            currentTile: 0,
                            currentRow: this.state.currentRow + 1,
                            message: (this.state.currentRow === 5) ? "Game Over" : `guess is ${guess}`,
                            isGameOver: this.state.currentRow === 5,
                        });
                        this.modifyTileState()
                        if (this.state.currentRow >= 5) {
                            setTimeout(() => this.setState({ message: "" }), 3000)
                        }
                    } else {
                        this.setState({
                            message: "Incorrect word",
                        });
                        setTimeout(() => this.setState({ message: "" }), 3000)
                    }
                })
            }
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

        const newState = Array.from(Array(5)).map(() => { return TileState.Inactive; })
        const keyStates = this.state.keysState.slice()

        guessRow.forEach((guessedChar, index) => {
            const tileState = (guessedChar === wordle[index])
                ? TileState.Green
                : (wordle.includes(guessedChar))
                    ? TileState.Yellow
                    : TileState.Grey
            const keyState = (guessedChar === wordle[index])
                ? KeyState.Green
                : (wordle.includes(guessedChar))
                    ? KeyState.Yellow
                    : KeyState.Grey
            newState[index] = tileState
            const foundKeyIndex = this.state.keys.indexOf(guessedChar)
            if (foundKeyIndex) {
                const foundState = keyStates[foundKeyIndex]
                if (this.keyStateImportance(keyState) > this.keyStateImportance(foundState)) {
                    keyStates[foundKeyIndex] = keyState
                }
            }

        })

        newState.forEach((state, index) => {
            setTimeout(() => {
                const tileStates = this.state.tileStates.slice();
                tileStates[this.state.currentRow - 1][index] = state
                this.setState({
                    tileStates: tileStates,
                })
            }, 500 * index)
        })

        setTimeout(() => {

            this.setState({
                keysState: keyStates
            })
        }, 3000)

    }

    private keyStateImportance(keyState: KeyState): number {
        return keyState === KeyState.Green
            ? 3
            : keyState === KeyState.Yellow
                ? 2
                : keyState === KeyState.Grey
                    ? 1
                    : 0
    }
}