import { GameState } from "../../game/gameSlice";
import { useAppSelector } from "../../redux/hooks";
import GuessRow from "./GuessRow";

export default function GuessRows() {

    const state: GameState = useAppSelector(state => state.game)

    return (
        <div className="tile-container">
            {
                state.guessRows.map((row: string[], index: number) => {
                    return <div
                        key={`row-${index}`}
                    >
                        <GuessRow row={row} tileStates={state.tileStates[index]} />
                    </div>
                })
            }
        </div>
    );
}