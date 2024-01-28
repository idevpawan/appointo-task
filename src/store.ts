// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from './slices/reducerSlice';

const store = configureStore({
  reducer: {
    data: reducerSlice,
    // Add other slices here if you have more slices in your application.
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
