import { KeyData } from "../Game";
import Key from "./Key";

interface KeyboardProps {
    keys: KeyData[]
    onKeyClicked: (text: string) => void
}

export default function Keyboard({ keys, onKeyClicked }: KeyboardProps) {
    return (
        <div className="key-container">
            {keys.map((key: KeyData, index: number) => {
                return <Key
                    text={key.key}
                    keyState={key.keyState}
                    key={key.key.toString()}
                    onKeyClicked={onKeyClicked}
                />
            })}
        </div>
    );
}
