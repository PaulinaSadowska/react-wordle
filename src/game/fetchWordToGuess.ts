import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRandomWord } from "../wordsRepository";

export const fetchWordToGuess = createAsyncThunk(
  'game/fetchWord',
  async () => {
    const result = await getRandomWord();
    return result;
  }
);