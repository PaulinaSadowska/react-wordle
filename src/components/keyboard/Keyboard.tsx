import { useAppSelector } from "../../redux/hooks";
import Key from "./Key";

interface KeyboardProps {
    onKeyClicked: (text: string) => void
}

export default function Keyboard({ onKeyClicked }: KeyboardProps) {
    const {keys, keysState} = useAppSelector(state => state.keys)

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
