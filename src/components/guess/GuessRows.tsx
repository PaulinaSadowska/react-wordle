import TileState from "../../data/TileState";
import GuessRow from "./GuessRow";


interface GuessRowsProps {
    rows: string[][],
    tileStates: TileState[][]
}

export default function GuessRows({ rows, tileStates }: GuessRowsProps) {
    return (
        <div className="tile-container">
            {
                rows.map((row: string[], index: number) => {
                    return <div
                        key={`row-${index}`}
                    >
                        <GuessRow row={row} tileStates={tileStates[index]} />
                    </div>
                })
            }
        </div>
    );
}