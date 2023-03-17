import { AppThunk } from "../redux/store";
import { showMessage } from "./gameSlice";

export const showTemaporaryMessage = (text: string): AppThunk =>
    (dispatch) => {
        dispatch(showMessage(text))
        setTimeout(() => showMessage(""), 3000)
};
