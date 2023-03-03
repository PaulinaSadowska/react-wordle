
interface GuessRowProps {
    row: String[]
}

export default function GuessRow({ row }: GuessRowProps) {
    return (
        <div className="tile-container">
            {
                row.map((element: String, index: Number) => {
                    return <div 
                        className="tile"
                        key={`row-${index}`}
                    >{element}</div>
                })
            }
        </div>
    );
}