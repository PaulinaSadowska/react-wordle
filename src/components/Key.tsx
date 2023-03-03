
interface KeyProps {
    text: String,
    onKeyClicked: (text: String) => void
}

export default function Key({ text, onKeyClicked }: KeyProps) {
    return (
        <button onClick={ () => onKeyClicked(text) }>
            {text}
        </button>
    );
}