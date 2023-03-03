import Key from "./Key";

interface KeyboardProps {
    onKeyClicked: (text: String) => void
}

export default function Keyboard({ onKeyClicked } : KeyboardProps) {
    return (
        <div className="key-container">
            {keys.map((key: String) => {
                return <Key 
                    text={key}
                    key={key.toString()}
                    onKeyClicked = {onKeyClicked}
                />
            })}
        </div>
    );
}

const keys : String[] = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]
  