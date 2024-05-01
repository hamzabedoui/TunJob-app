import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { JobDetails } from "../../types/types";
import Cookies from "js-cookie";

export const createJob: any = createAsyncThunk(
  "create/createJob",
  async (jobDetails: JobDetails, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://localhost:5000/api/v1/jobs",
        jobDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getJobs: any = createAsyncThunk("get/getJobs", async () => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      "http://localhost:5000/api/v1/jobs",
      { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteJob: any = createAsyncThunk(
  "delete/deleteJob",
  async (jobId: string, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `http://localhost:5000/api/v1/jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      return jobId; // Return the deleted jobId
    } catch (error) {
      throw error;
    }
  }
);

export const editJob: any = createAsyncThunk(
  "edit/editJob",
  async (payload: { jobId: string, updatedDetails: JobDetails }, thunkAPI: any) => {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `http://localhost:5000/api/v1/jobs/${payload.jobId}`,
        payload.updatedDetails,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      response.status === 200 && thunkAPI.dispatch(getJobs)
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
        state.error = action.error.message || "Job creation failed";
      })
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Couldn't get your jobs";
      })
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted job from the state
        state.jobs = state.jobs.filter(job => job.id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Job deletion failed";
      })
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        // Update the job with the edited details in the state
        state.jobs = state.jobs.map(job => {
          if (job._id === action.payload._id) {
            return action.payload;
          }
          return job;
        });
      })
      
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Job editing failed";
      });
  },
});

export default JobSlice.reducer;
