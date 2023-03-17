import TileState from "../../data/TileState";

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

function convertTileStateToClassName(tileState: TileState) : string {
    return (tileState === TileState.Green) 
        ? "flip green-overlay"
        : (tileState === TileState.Yellow)
        ? "flip yellow-overlay"
        : (tileState === TileState.Grey)
        ? "flip grey-overlay"
        : "grey-overlay"
}