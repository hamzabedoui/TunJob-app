import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import LoginSlice from "./features/LoginSlice";
import JobSlice from "./features/JobSlice";
import resetProfileEditState from "./features/ProfileEditSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    job: JobSlice,
    editProfile: resetProfileEditState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
