import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getRandomWord } from "../wordsRepository";
import { GameState } from "./gameSlice";

export const fetchWordAsync = createAsyncThunk(
    'game/fetchWord',
    async () => {
      const result = await getRandomWord();
      return result;
    }
  );

  export const fetchWordResultReducer = (state: GameState, action: PayloadAction<string>) => {
    console.log(action.payload)
    state.word = action.payload
}