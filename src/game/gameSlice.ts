import { createSlice } from '@reduxjs/toolkit'
import TileState from '../data/TileState';
import { modifyTileReducer } from './modifyTileState';
import { addLetterReducer, deleteLetterReducer } from './keyboardReducers';
import { fetchWordToGuess } from './fetchWordToGuess';

export interface GameState {
  currentRow: number,
  currentTile: number,
  isGameOver: boolean,
  word: string,
  guessRows: string[][],
  tileStates: TileState[][]
}

const initialState: GameState = {
  currentRow: 0,
  currentTile: 0,
  isGameOver: false,
  word: "OFFER",
  guessRows: initializeBoardWith(""),
  tileStates: initializeBoardWith(TileState.Inactive),
};

export const gameSlice = createSlice({
  name: 'wordle',
  initialState,
  reducers: {
    deleteLetter: deleteLetterReducer,
    addLetter: addLetterReducer,
    modifyTile: modifyTileReducer,
    moveToNextRow: (state) => {
      state.currentTile = 0;
      state.currentRow = state.currentRow + 1;
      state.isGameOver = state.currentRow === 5;
    },
    endGame: (state) => {
      state.isGameOver = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordToGuess.fulfilled, (state, action) => {
        console.log(action.payload)
        state.word = action.payload
      })
  }
})

export const { deleteLetter, addLetter, endGame, modifyTile, moveToNextRow } = gameSlice.actions

export default gameSlice.reducer

function initializeBoardWith(data: any): any[][] {
  return Array.from(Array(6)).map(() => { return Array.from(Array(5)).map(() => { return data; }); });
}