import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReducerState {
  isProceed: boolean;
}

const initialState: ReducerState = {
  isProceed: false,
};

const reducerSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<boolean>) => {
      state.isProceed = action.payload;
    },
  },
});

export const { set } = reducerSlice.actions;
export default reducerSlice.reducer;
