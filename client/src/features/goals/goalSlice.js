import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new goal
export const createGoal = createAsyncThunk('goals/create', async(data, thunkAPI) => {
  try {
    return await goalService.createGoal(data)
  } catch(err) {
    const message = (err.message && err.response.data.message && err.response.data.message || err.message) || err.response || err.toString() || 'Something went wrong'
    return thunkAPI.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => {
      state.goals = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {}
})

export const actions = goalSlice.actions;
export default goalSlice.reducer;