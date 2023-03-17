import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { checkWord } from "../wordsRepository";
import { GameState } from "./gameSlice";

interface CheckWordResult{
    result: boolean,
    guess: string
}
export const checkWordAsync = createAsyncThunk(
    'game/checkWord',
    async (guess: string) => {
      const result : boolean = await checkWord(guess);
      return {
        result: result,
        guess: guess
      } as CheckWordResult
    }
  );

  export const checkWordResultReducer = (state: GameState, action: PayloadAction<CheckWordResult>) => {
    if (action.payload.result === true) {
      state.currentTile = 0;
      state.currentRow = state.currentRow + 1;
      state.message = (state.currentRow === 5) ? "Game Over" : `guess is ${action.payload.guess}`;
      state.isGameOver = state.currentRow === 5;
    }
    else {
        state.message = "Incorrect word";
    }
}