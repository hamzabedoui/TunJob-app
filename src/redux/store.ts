import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
