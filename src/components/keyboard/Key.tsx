import { KeyState} from "../Game";

interface KeyProps {
    text: string,
    keyState: KeyState,
    onKeyClicked: (text: string) => void
}

export default function Key({ text, keyState, onKeyClicked }: KeyProps) {
    return (
        <button className={`tile ${convertTileStateToClassName(keyState)}`} onClick={ () => onKeyClicked(text) }>
            {text}
        </button>
    );
}

function convertTileStateToClassName(tileState: KeyState) : string {
    return (tileState === KeyState.Green) 
        ? "green-overlay"
        : (tileState === KeyState.Yellow)
        ? "yellow-overlay"
        : "grey-overlay"
}