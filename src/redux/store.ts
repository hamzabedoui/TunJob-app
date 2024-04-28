import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import LoginSlice from "./features/LoginSlice";
import CreateJobSlice from "./features/CreateJobSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    Login: LoginSlice,
    createJob: CreateJobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
