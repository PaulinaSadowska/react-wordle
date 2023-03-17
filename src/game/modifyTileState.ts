import { PayloadAction } from "@reduxjs/toolkit";
import TileState from "../data/TileState";
import { GameState, modifyTile } from "../game/gameSlice";
import { AppThunk } from "../redux/store";

export const modifyTileState = (): AppThunk =>
    (dispatch, getState) => {
        const state = getState().game
        const guessRow = state.guessRows[state.currentRow - 1]
        const wordle = state.word.split("")

        guessRow
            .forEach((guessedChar, index) => {
                const tileState = toTileState(guessedChar, wordle, index)
                setTimeout(() => {
                    dispatch(modifyTile({
                        row: state.currentRow - 1,
                        column: index,
                        tileState: tileState
                    }))
                }, 500 * index)
            })
    };

function toTileState(guessedChar: string, wordle: string[], index: number): TileState {
    return (guessedChar === wordle[index])
        ? TileState.Green
        : (wordle.includes(guessedChar))
            ? TileState.Yellow
            : TileState.Grey;
}

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
