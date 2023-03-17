import KeyState from "../../data/KeyState";
import Key from "./Key";

interface KeyboardProps {
    keys: string[],
    keysState: KeyState[]
    onKeyClicked: (text: string) => void
}

export default function Keyboard({ keys, keysState, onKeyClicked }: KeyboardProps) {
    return (
        <div className="key-container">
            {keys.map((key: string, index: number) => {
                return <Key
                    text={key}
                    keyState={keysState[index]}
                    key={key.toString()}
                    onKeyClicked={onKeyClicked}
                />
            })}
        </div>
    );
}
