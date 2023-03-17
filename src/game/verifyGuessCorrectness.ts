import { modifyKeyState } from "./modifyKeyState";
import { modifyTileState } from "./modifyTileState";
import { AppThunk } from "../redux/store";
import { checkWord } from "../wordsRepository";
import { moveToNextRow } from "./gameSlice";
import { showTemporaryMessage } from "./messageSlice";

export const verifyGuessCorrectness = (guess: string): AppThunk =>
  async (dispatch, getState) => {
    const result: boolean = await checkWord(guess);
    if (result === true) {
      dispatch(moveToNextRow())
      const message = (getState().game.currentRow === 5) ? "Game Over" : `guess is ${guess}`;
      dispatch(showTemporaryMessage(message))
      dispatch(modifyKeyState())
      dispatch(modifyTileState())
    }
    else {
      dispatch(showTemporaryMessage("Incorrect word"))
    }
  };
