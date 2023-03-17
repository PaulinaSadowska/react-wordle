import { useDispatch } from "react-redux";
import KeyState from "../data/KeyState";
import { checkWord } from "../wordsRepository";
import { deleteLetter, GameState } from "./gameSlice";

function checkRowReducer(state: GameState): any {
    if (state.currentTile === 5) {
        const guess = state.guessRows[state.currentRow].join('')

        if (guess === state.word) {
            state.currentRow = state.currentRow + 1;
            state.message = "Congratulations!";
            state.isGameOver = true;
            //this.modifyTileState()
        } else {

            /*checkWord(guess).then((result) => {
                if (result === true) {
                    state.currentTile = 0;
                    state.currentRow = state.currentRow + 1;
                    state.message = (state.currentRow === 5) ? "Game Over" : `guess is ${guess}`;
                    state.isGameOver = state.currentRow === 5;
                    //this.modifyTileState()
                    /*if (state.currentRow >= 5) {
                        setTimeout(() => this.setState({ message: "" }), 3000)
                    }
                } else {
                    state.message = "Incorrect word";
                   // setTimeout(() => this.setState({ message: "" }), 3000)
                }
            })*/
        }
    }
}

export default checkRowReducer

/*
function modifyTileState() {
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
*/
function keyStateImportance(keyState: KeyState): number {
    return keyState === KeyState.Green
        ? 3
        : keyState === KeyState.Yellow
            ? 2
            : keyState === KeyState.Grey
                ? 1
                : 0
}