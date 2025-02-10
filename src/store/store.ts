import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers"

export const store = configureStore({
  reducer: {userReducer}, 
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
