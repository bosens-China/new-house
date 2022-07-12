import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

interface InitialState {
  root: boolean;
}

const initialState: InitialState = {
  root: false,
};

export const slice = createSlice({
  name: 'users',

  initialState,
  reducers: {
    setRoot: (state, action: PayloadAction<boolean>) => {
      const obj = state;

      obj.root = action.payload;
    },
  },
});

export const { setRoot } = slice.actions;
export const selectUsers = (state: RootState) => state.users;
export default slice.reducer;
