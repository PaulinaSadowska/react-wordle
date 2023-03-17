import { createSlice } from '@reduxjs/toolkit'
import allKeys from '../data/AllKeys';
import KeyState from '../data/KeyState';
import TileState from '../data/TileState';
import { modifyKeysReducer } from '../middlewares/modifyKeyState';
import { modifyTileReducer } from '../middlewares/modifyTileState';
import addLetterReducer from './addLetterReducer';
import { moveToNextRowReducer } from './checkWordAsync';
import deleteLetterReducer from './deleteLetterReducer';
import { fetchWordAsync, fetchWordResultReducer } from './fetchWordAsync';
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

export const gameSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    deleteLetter: deleteLetterReducer,
    addLetter: addLetterReducer,
    winGame: winGameReducer,
    modifyTile: modifyTileReducer,
    modifyKeys: modifyKeysReducer,
    moveToNextRow: moveToNextRowReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordAsync.fulfilled, fetchWordResultReducer)
    }
})

export const { deleteLetter, addLetter, winGame, modifyTile, modifyKeys, moveToNextRow } = gameSlice.actions

export default gameSlice.reducer

function initializeBoardWith(data: any): any[][] {
  return Array.from(Array(6)).map(() => { return Array.from(Array(5)).map(() => { return data; }); });
}