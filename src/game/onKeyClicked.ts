import { addLetter, deleteLetter } from "../game/gameSlice";
import { AppThunk } from "../redux/store";
import { submitGuess } from "./submitGuess";

export const onKeyClicked = (text: string): AppThunk =>
    (dispatch, getState) => {
        if (getState().game.isGameOver === true) {
            return
        }
        if (text === '«') {
            dispatch(deleteLetter())
        }
        else if (text === 'ENTER') {
            dispatch(submitGuess())
        }
        else if (getState().game.currentTile < 5) {
            dispatch(addLetter(text));
        }
    };