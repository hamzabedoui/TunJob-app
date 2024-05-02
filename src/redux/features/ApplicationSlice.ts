import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppDetails } from "../../types/types";
import Cookies from "js-cookie";

export const createApplication: any = createAsyncThunk(
  "create/createApplication",
  async (applicationDetails: AppDetails, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `http://localhost:5000/api/v1/applications/${applicationDetails.job}`,
        {
          coverLetter: applicationDetails.coverLetter,
          startDate: applicationDetails.startDate,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

interface AppState {
  loading: boolean;
  error: string | null;
  applications: any[];
}

const initialState: AppState = {
  loading: false,
  error: null,
  applications: [],
};

const ApplicationSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "application creation failed";
      });
  },
});

export default ApplicationSlice.reducer;
