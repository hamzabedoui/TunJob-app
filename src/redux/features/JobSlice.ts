import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { JobDetails } from "../../types/types";
import Cookies from "js-cookie";

export const createJob: any = createAsyncThunk(
  "jobs/createJob",
  async (JobDetails: JobDetails, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/jobs",
        JobDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      /* response.status === 200 && thunkAPI.dispatch(getPosts()); */
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
interface JobState {
  loading: boolean;
  error: string | null;
  jobs: any[];
  allJobs: any[];
}

const initialState: JobState = {
  loading: false,
  error: null,
  jobs: [],
  allJobs: [],
};

const JobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Job creation  failed";
      });
  },
});

export default JobSlice.reducer;