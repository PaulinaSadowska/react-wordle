import { PayloadAction } from "@reduxjs/toolkit";
import TileState from "../data/TileState";
import { GameState, modifyTile } from "../reducers/gameSlice";
import { AppThunk } from "../redux/store";

export const modifyTileState = (): AppThunk =>
    (dispatch, getState) => {
        const state = getState().game
        const guessRow = state.guessRows[state.currentRow - 1]
        const wordle = state.word.split("")

        const newTileStates = Array.from(Array(5)).map(() => { return TileState.Inactive; })

        guessRow.forEach((guessedChar, index) => {
            const tileState = (guessedChar === wordle[index])
                ? TileState.Green
                : (wordle.includes(guessedChar))
                    ? TileState.Yellow
                    : TileState.Grey
            newTileStates[index] = tileState
        })

        newTileStates.forEach((tileState, index) => {
            setTimeout(() => {
                dispatch(modifyTile({
                    row: state.currentRow - 1,
                    column: index,
                    tileState: tileState
                }))
            }, 500 * index)
        })
    };

interface TileToModify {
    row: number,
    column: number,
    tileState: TileState
}

export function modifyTileReducer(state: GameState, action: PayloadAction<TileToModify>): any {
    const tileStates = state.tileStates.slice();
    tileStates[action.payload.row][action.payload.column] = action.payload.tileState
    state.tileStates = tileStates
}
