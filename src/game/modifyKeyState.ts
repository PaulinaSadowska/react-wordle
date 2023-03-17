import KeyState from "../data/KeyState";
import { AppThunk } from "../redux/store";
import { modifyKeys } from "./keysSlice";

export const modifyKeyState = (rowToCheck: number): AppThunk =>
    (dispatch, getState) => {
        
        const gameState = getState().game
        const guessRow = gameState.guessRows[rowToCheck]
        const wordle = gameState.word.split("")

        const keyStates =  getState().keys.keysState.slice()

        guessRow.forEach((guessedChar, index) => {
            const keyState = toKeyState(guessedChar, wordle, index)
            const foundKeyIndex =  getState().keys.keys.indexOf(guessedChar) 
            if (keyStateImportance(keyState) > keyStateImportance(keyStates[foundKeyIndex])) {
                keyStates[foundKeyIndex] = keyState
            }
        })

        setTimeout(() => {
            dispatch(modifyKeys(keyStates))
        }, 3000)
    };

function toKeyState(guessedChar: string, wordle: string[], index: number) {
    return (guessedChar === wordle[index])
        ? KeyState.Green
        : (wordle.includes(guessedChar))
            ? KeyState.Yellow
            : KeyState.Grey;
}

function keyStateImportance(keyState: KeyState): number {
    return keyState === KeyState.Green
        ? 3
        : keyState === KeyState.Yellow
            ? 2
            : keyState === KeyState.Grey
                ? 1
                : 0
}