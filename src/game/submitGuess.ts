import { verifyGuessCorrectness } from "./verifyGuessCorrectness";
import { endGame } from "./gameSlice";
import { AppThunk } from "../redux/store";
import { modifyKeyState } from "./modifyKeyState";
import { modifyTileState } from "./modifyTileState";
import { showMessage } from "./messageSlice";

export const submitGuess = (): AppThunk => (dispatch, getState) => {
    const state = getState().game
    if (state.currentTile === 5) {
        const guess = state.guessRows[state.currentRow].join('')

        if (guess === state.word) {
            dispatch(endGame())
            dispatch(showMessage("You won! 🎉🎉"))
            dispatch(modifyKeyState(state.currentRow))
            dispatch(modifyTileState(state.currentRow))
        } else {
            dispatch(verifyGuessCorrectness(guess))
        }
    }
};