
interface KeyProps {
    text: string,
    onKeyClicked: (text: string) => void
}

export default function Key({ text, onKeyClicked }: KeyProps) {
    return (
        <button onClick={ () => onKeyClicked(text) }>
            {text}
        </button>
    );
}