import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  loading: false,
  error: "",
  success: false,
};

// Async thunk action to update user profile
export const updateUserProfile = createAsyncThunk(
  "profile/update",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put("http://localhost:5000/api/v1/auth/user", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Create the profile editing slice
const profileEditSlice = createSlice({
  name: "profileEdit",
  initialState,
  reducers: {
    resetProfileEditState: (state) => {
      state.loading = false;
      state.error = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

// Export the slice reducer and actions
export const { resetProfileEditState } = profileEditSlice.actions;
export default profileEditSlice.reducer;
