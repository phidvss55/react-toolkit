import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(sessionStorage.getItem('user'))

const initialState = {
  user: user ? user : null, 
  isError: false, 
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try { 
    return await authService.register(data)
  } catch(err) {
    const message = (err.message && err.response.data.message && err.response.data.message || err.message) || err.response || err.toString() || 'Something went wrong'
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try { 
    return await authService.login(data)
  } catch(err) {
    const message = (err.message && err.response.data.message && err.response.data.message || err.message) || err.response || err.toString() || 'Something went wrong'
    return thunkAPI.rejectWithValue(message)
  }
})

// logout user
export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    return await authService.logout()
  } catch(err) {
    const message = (err.message && err.response.data.message && err.response.data.message || err.message) || err.response || err.toString() || 'Something went wrong'
    return thunkAPI.rejectWithValue(message)
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('action', action)
        state.isLoading = false;
        state.isSuccess = true; 
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
  }
});

export const { reset } = authSlice.actions;
// export const actions = authSlice.actions;
export default authSlice.reducer;
