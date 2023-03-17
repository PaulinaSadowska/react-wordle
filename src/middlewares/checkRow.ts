import { checkWordAsync } from "../reducers/checkWordAsync";
import { winGame } from "../reducers/gameSlice";
import { AppThunk } from "../redux/store";

export const checkRow = (): AppThunk =>
        (dispatch, getState) => {
            const state = getState().game
            if (state.currentTile === 5) {
                const guess = state.guessRows[state.currentRow].join('')

                if (guess === state.word) {
                    dispatch(winGame())
                    //this.modifyTileState()
                } else {
                    dispatch(checkWordAsync(guess))
                }
            }
        };