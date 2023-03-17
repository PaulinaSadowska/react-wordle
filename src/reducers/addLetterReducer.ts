import { PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./gameSlice";

function addLetterReducer(state: GameState, action: PayloadAction<string>): any {
    let newRows = state.guessRows.slice();
    newRows[state.currentRow][state.currentTile] = action.payload;

    state.currentTile = state.currentTile + 1;
    state.guessRows = newRows;
}

export default addLetterReducer