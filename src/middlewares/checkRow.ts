import { verifyWord } from "../reducers/checkWordAsync";
import { winGame } from "../reducers/gameSlice";
import { AppThunk } from "../redux/store";
import { modifyKeyState } from "./modifyKeyState";
import { modifyTileState } from "./modifyTileState";

export const checkRow = (): AppThunk =>
    (dispatch, getState) => {
        const state = getState().game
        if (state.currentTile === 5) {
            const guess = state.guessRows[state.currentRow].join('')

            if (guess === state.word) {
                dispatch(winGame())
                dispatch(modifyKeyState())
                dispatch(modifyTileState())
            } else {
                dispatch(verifyWord(guess))
            }
        }
    };