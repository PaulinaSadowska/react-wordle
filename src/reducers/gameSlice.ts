import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import allKeys from '../data/AllKeys';
import KeyState from '../data/KeyState';
import TileState from '../data/TileState';
import { AppThunk } from '../redux/store';
import { checkWord } from '../wordsRepository';
import addLetterReducer from './addLetterReducer';
import checkRowReducer from './checkRowReducer';
import deleteLetterReducer from './deleteLetterReducer';

export interface GameState {
  currentRow: number,
  currentTile: number,
  message: string,
  isGameOver: boolean,
  word: string,
  guessRows: string[][],
  tileStates: TileState[][]
  keys: string[],
  keysState: KeyState[]
}

const initialState: GameState = {
  currentRow: 0,
  currentTile: 0,
  message: "",
  isGameOver: false,
  word: "OFFER",
  guessRows: initializeBoardWith(""),
  tileStates: initializeBoardWith(TileState.Inactive),
  keys: allKeys,
  keysState: allKeys.map(() => { return KeyState.LightGrey })
};

function initializeBoardWith(data: any): any[][] {
  return Array.from(Array(6)).map(() => { return Array.from(Array(5)).map(() => { return data; }); });
}

export const checkWordAsync = createAsyncThunk(
  'game/checkWord',
  async (guess: string) => {
    const result : boolean = await checkWord(guess);
    // The value we return becomes the `fulfilled` action payload
    return {
      result: result,
      guess: guess
    }
  }
);

export const gameSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    deleteLetter: deleteLetterReducer,
    addLetter: addLetterReducer,
    checkRow: checkRowReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkWordAsync.fulfilled, (state, action) => {
        if (action.payload.result === true) {
          state.currentTile = 0;
          state.currentRow = state.currentRow + 1;
          state.message = (state.currentRow === 5) ? "Game Over" : `guess is ${action.payload.guess}`;
          state.isGameOver = state.currentRow === 5;
        }
        else {
          console.log("NOPE" + action.payload)
        }
  })}
})

// Action creators are generated for each case reducer function
export const { deleteLetter, addLetter, checkRow } = gameSlice.actions

export default gameSlice.reducer

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const onKeyClicked =
  (text: string): AppThunk =>
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