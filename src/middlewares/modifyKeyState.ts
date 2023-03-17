import { PayloadAction } from "@reduxjs/toolkit";
import KeyState from "../data/KeyState";
import { GameState, modifyKeys } from "../reducers/gameSlice";
import { AppThunk } from "../redux/store";

export const modifyKeyState = (): AppThunk =>
    (dispatch, getState) => {
        const state = getState().game
        const guessRow = state.guessRows[state.currentRow - 1]
        const wordle = state.word.split("")

        const keyStates = state.keysState.slice()

        guessRow.forEach((guessedChar, index) => {
            const keyState = (guessedChar === wordle[index])
                ? KeyState.Green
                : (wordle.includes(guessedChar))
                    ? KeyState.Yellow
                    : KeyState.Grey
            const foundKeyIndex = state.keys.indexOf(guessedChar)
            if (foundKeyIndex) {
                const foundState = keyStates[foundKeyIndex]
                if (keyStateImportance(keyState) > keyStateImportance(foundState)) {
                    keyStates[foundKeyIndex] = keyState
                }
            }

        })

        setTimeout(() => {
            dispatch(modifyKeys(keyStates))
        }, 3000)
    };

export function modifyKeysReducer(state: GameState, action: PayloadAction<KeyState[]>): any {
    state.keysState = action.payload
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