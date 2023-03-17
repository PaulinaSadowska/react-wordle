import { PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./gameSlice";

export function deleteLetterReducer(state: GameState): any {
  if (state.currentTile > 0) {
    let newRows = state.guessRows.slice();
    newRows[state.currentRow][state.currentTile - 1] = '';
    state.currentTile = state.currentTile - 1;
    state.guessRows = newRows;
  }
}

export function addLetterReducer(state: GameState, action: PayloadAction<string>): any {
  let newRows = state.guessRows.slice();
  newRows[state.currentRow][state.currentTile] = action.payload;

  state.currentTile = state.currentTile + 1;
  state.guessRows = newRows;
}