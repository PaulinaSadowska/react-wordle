import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import allKeys from '../data/AllKeys';
import KeyState from '../data/KeyState';

export interface KeysState {
  keys: string[],
  keysState: KeyState[]
}

const initialState: KeysState = {
  keys: allKeys,
  keysState: allKeys.map(() => { return KeyState.LightGrey })
};

export const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    modifyKeys: (state: KeysState, action: PayloadAction<KeyState[]>) => {
        state.keysState = action.payload
    },
  },
})

export const { modifyKeys} = keysSlice.actions

export default keysSlice.reducer