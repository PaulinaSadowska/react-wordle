import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { modifyKeyState } from "../middlewares/modifyKeyState";
import { modifyTileState } from "../middlewares/modifyTileState";
import { AppThunk } from "../redux/store";
import { checkWord } from "../wordsRepository";
import { GameState, moveToNextRow } from "./gameSlice";

export const verifyWord = (guess: string): AppThunk =>
  async (dispatch) => {
    const result: boolean = await checkWord(guess);
    if (result === true) {
      dispatch(moveToNextRow(guess))
      dispatch(modifyKeyState())
      dispatch(modifyTileState())
    }
    else {
      // dispatch
      // state.message = "Incorrect word";
    }
  };

export const moveToNextRowReducer = (state: GameState, action: PayloadAction<string>) => {
  state.currentTile = 0;
  state.currentRow = state.currentRow + 1;
  state.message = (state.currentRow === 5) ? "Game Over" : `guess is ${action.payload}`;
  state.isGameOver = state.currentRow === 5;
}