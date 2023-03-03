import GuessRow from "./GuessRow";


interface GuessRowsProps {
    rows: String[][]
}

export default function GuessRows({ rows }: GuessRowsProps) {
    return (
        <div className="tile-container">
            {
                rows.map((row: String[], index: Number) => {
                    return <div
                        key={`row-${index}`}
                    >
                        <GuessRow row={row} />
                    </div>
                })
            }
        </div>
    );
}