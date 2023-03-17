import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { GameState } from "../game/gameSlice";
import { useEffect } from "react";
import { onKeyClicked } from "../game/onKeyClicked";
import { fetchWordToGuess } from "../game/fetchWordToGuess";
import { MessageState } from "../game/messageSlice";

export default function Game() {

    const state: GameState = useAppSelector(state => state.game)
    const messageState: MessageState = useAppSelector(state => state.message)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWordToGuess());
    }, [dispatch]);

    return (
        <div className="game-container">
            <header className="title-container">
                <h1>Wordle</h1>
            </header>
            <Message message={messageState.message} />
            <GuessRows
                rows={state.guessRows}
                tileStates={state.tileStates}
            />
            <Keyboard
                keys={state.keys}
                keysState={state.keysState}
                onKeyClicked={(text: string) => {
                    dispatch(onKeyClicked(text))
                }}
            />
        </div>
    );
}