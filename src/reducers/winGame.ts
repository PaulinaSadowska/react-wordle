import { GameState } from "./gameSlice";

function winGameReducer(state: GameState) : any {
    state.message = "Congratulations!";
    state.isGameOver = true;
  }

  export default winGameReducer