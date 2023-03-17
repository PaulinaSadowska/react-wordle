import { MessageState } from "../game/messageSlice";
import { useAppSelector } from "../redux/hooks";

export default function Message() {

    const state: MessageState = useAppSelector(state => state.message)
    
    return (
        <div className="message-container">
            {state.message ? <p>{state.message}</p> : undefined }
        </div>
    );
}