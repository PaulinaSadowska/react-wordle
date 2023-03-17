import { GameState } from "./gameSlice";

function deleteLetterReducer(state: GameState) : any {
    if (state.currentTile > 0) {
      let newRows = state.guessRows.slice();
      newRows[state.currentRow][state.currentTile - 1] = '';
      state.currentTile = state.currentTile - 1;
      state.guessRows = newRows;
    }
  }

  export default deleteLetterReducer