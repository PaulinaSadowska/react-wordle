import { addLetter, deleteLetter } from "../reducers/gameSlice";
import { AppThunk } from "../redux/store";
import { checkRow } from "./checkRow";

export const onKeyClicked = (text: string): AppThunk =>
    (dispatch, getState) => {
        if (getState().game.isGameOver === true) {
            return
        }
        if (text === '«') {
            dispatch(deleteLetter())
        }
        else if (text === 'ENTER') {
            dispatch(checkRow())
        }
        else if (getState().game.currentTile < 5) {
            dispatch(addLetter(text));
        }
    };