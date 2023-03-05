import { TileState } from "../Game";

interface GuessRowProps {
    row: string[],
    tileStates: TileState[],
}

export default function GuessRow({ row, tileStates }: GuessRowProps) {
    return (
        <div className="tile-container">
                {
                    row.map((element: string, index: number) => {
                        return <div
                            className={`tile ${convertTileStateToClassName(tileStates[index])}`}
                            key={`row-${index}`}
                        >{element}</div>
                    })
                }
        </div>
    );
}

function convertTileStateToClassName(tileState: TileState) : String {
    return (tileState === TileState.Green) 
        ? "green-overlay"
        : (tileState === TileState.Yellow)
        ? "yellow-overlay"
        : "grey-overlay"
}