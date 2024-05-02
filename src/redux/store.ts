import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import LoginSlice from "./features/LoginSlice";
import JobSlice from "./features/JobSlice";
import resetProfileEditState from "./features/ProfileEditSlice";
import ApplicationSlice from "./features/ApplicationSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    job: JobSlice,
    application: ApplicationSlice,
    editProfile: resetProfileEditState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
