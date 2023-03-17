import KeyState from "../../data/KeyState";

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
        : (tileState === KeyState.LightGrey)
        ? "lightgrey-overlay"
        : "grey-overlay"
}