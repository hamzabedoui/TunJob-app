import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { JobDetails } from '../../types/types'; // Import the JobDetails type

// Define the thunk for creating a job
export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobDetails: JobDetails) => {
    try {
      const response = await axios.post('/api/jobs', jobDetails); // Adjust the endpoint as per your backend route
      return response.data;
    } catch (error) {
      throw(error)
    }
  }
);

// Define the initial state and reducers
const initialState = {
  // Define initial state here
};

const createJobsSlice = createSlice({
  name: 'createJobs',
  initialState,
  reducers: {
    // Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.fulfilled, (state, action) => {
      // Handle fulfilled action if needed
    });
    builder.addCase(createJob.rejected, (state, action) => {
      // Handle rejected action if needed
    });
  },
});

export default createJobsSlice.reducer;
