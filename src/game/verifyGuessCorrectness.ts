import { modifyKeyState } from "./modifyKeyState";
import { modifyTileState } from "./modifyTileState";
import { AppThunk } from "../redux/store";
import { checkWord } from "../wordsRepository";
import { moveToNextRow } from "./gameSlice";
import { showTemporaryMessage } from "./messageSlice";

export const verifyGuessCorrectness = (guess: string): AppThunk =>
  async (dispatch, getState) => {
    const result: boolean = await checkWord(guess);
    const currentRow = getState().game.currentRow
    if (result === true) {
      const message = (currentRow === 5) ? "Game Over" : `guess is ${guess}`;
      dispatch(showTemporaryMessage(message))
      dispatch(modifyKeyState(currentRow))
      dispatch(modifyTileState(currentRow))
      dispatch(moveToNextRow())
    }
    else {
      dispatch(showTemporaryMessage("Incorrect word"))
    }
  };
