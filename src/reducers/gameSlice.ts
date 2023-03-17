import { createSlice } from '@reduxjs/toolkit'
import allKeys from '../data/AllKeys';
import KeyState from '../data/KeyState';
import TileState from '../data/TileState';
import addLetterReducer from './addLetterReducer';
import checkRowReducer from './checkRowReducer';
import { checkWordAsync, checkWordResultReducer } from './checkWordAsync';
import deleteLetterReducer from './deleteLetterReducer';
import winGameReducer from './winGame';

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

export const gameSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    deleteLetter: deleteLetterReducer,
    addLetter: addLetterReducer,
   // checkRow: checkRowReducer,
    winGame: winGameReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkWordAsync.fulfilled, checkWordResultReducer)}
})

// Action creators are generated for each case reducer function
export const { deleteLetter, addLetter, winGame } = gameSlice.actions

export default gameSlice.reducer