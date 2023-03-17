import GuessRows from "./guess/GuessRows";
import Keyboard from "./keyboard/Keyboard";
import Message from "./Message";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { GameState } from "../reducers/gameSlice";
import { onKeyClicked } from "../middlewares/onKeyClicked";
import { useEffect } from "react";
import { fetchWordAsync } from "../reducers/fetchWordAsync";

export default function Game() {

    const state: GameState = useAppSelector(state => state.game)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWordAsync());
    }, [dispatch]);

    return (
        <div className="game-container">
            <header className="title-container">
                <h1>Wordle</h1>
            </header>
            <Message message={state.message} />
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