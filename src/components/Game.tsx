import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { onKeyClicked } from "../game/onKeyClicked";
import { fetchWordToGuess } from "../game/fetchWordToGuess";

export default function Game() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWordToGuess());
    }, [dispatch]);

    return (
        <div className="game-container">
            <header className="title-container">
                <h1>Wordle</h1>
            </header>
            <Message />
            <GuessRows />
            <Keyboard
                onKeyClicked={(text: string) => {
                    dispatch(onKeyClicked(text))
                }}
            />
        </div>
    );
}