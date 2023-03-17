import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../redux/store';

export interface MessageState {
  message: string,
}

const initialState: MessageState = {
  message: "",
};

export const showTemporaryMessage = (text: string): AppThunk =>
    (dispatch) => {
        dispatch(showMessage(text))
        setTimeout(() => dispatch(showMessage("")), 3000)
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state: MessageState, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
})

export const { showMessage } = messageSlice.actions

export default messageSlice.reducer